import { Mode, ModeContext, ModeGuardResult } from './mode.types';

const COOLDOWN_MS = 2 * 60 * 1000;
const RUNAWAY_WINDOW_MS = 10 * 60 * 1000;
const RUNAWAY_THRESHOLD = 5;

let lastSwitchAt: Date | undefined;
let switchHistory: Date[] = [];

const pruneHistory = (now: Date): void => {
  switchHistory = switchHistory.filter(
    (timestamp) => now.getTime() - timestamp.getTime() <= RUNAWAY_WINDOW_MS,
  );
};

export const recordModeSwitchTimestamp = (timestamp: Date): void => {
  lastSwitchAt = timestamp;
  switchHistory.push(timestamp);
  pruneHistory(timestamp);
};

export const isWithinCooldown = (now: Date): boolean => {
  if (!lastSwitchAt) return false;
  return now.getTime() - lastSwitchAt.getTime() < COOLDOWN_MS;
};

export const isRunawaySwitching = (now: Date): boolean => {
  pruneHistory(now);
  return switchHistory.length >= RUNAWAY_THRESHOLD;
};

export const guardModeSwitch = (
  currentContext: ModeContext,
  nextMode: Mode,
  now: Date = new Date(),
): ModeGuardResult => {
  if (currentContext.activeMode === nextMode) {
    return { allowed: false, reason: 'mode-already-active' };
  }

  if (isWithinCooldown(now)) {
    return { allowed: false, reason: 'cooldown-active' };
  }

  if (isRunawaySwitching(now)) {
    return { allowed: false, reason: 'runaway-switching-prevented' };
  }

  return { allowed: true };
};
