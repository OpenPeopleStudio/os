import { guardModeSwitch, recordModeSwitchTimestamp } from './mode-guards';
import { getModeEffects, isModeSupported, resolvePreferredMode } from './mode-registry';
import { ModeContext, Mode, ModeTrigger, ModeChangeEvent } from './mode.types';
import { selectPrimaryTrigger } from './mode-triggers';

let currentContext: ModeContext | undefined;
const listeners: Array<(event: ModeChangeEvent) => void> = [];

const defaultMode: Mode = 'Earth';

export const initializeMode = (
  identityId: string,
  initialMode: Mode = defaultMode,
): ModeContext => {
  if (!currentContext) {
    const effectiveMode = isModeSupported(initialMode) ? initialMode : defaultMode;
    currentContext = {
      identityId,
      activeMode: effectiveMode,
      updatedAt: new Date(),
      effects: getModeEffects(effectiveMode),
    };
  }

  return currentContext;
};

export const setMode = (
  identityId: string,
  mode: Mode,
  trigger?: ModeTrigger,
): ModeContext => {
  if (!isModeSupported(mode)) {
    throw new Error(`Unsupported mode: ${mode}`);
  }

  const now = new Date();
  const previous: ModeContext = currentContext ?? {
    identityId,
    activeMode: defaultMode,
    updatedAt: now,
    effects: getModeEffects(defaultMode),
  };

  const guardResult = guardModeSwitch(previous, mode, now);
  if (!guardResult.allowed) {
    return previous;
  }

  const next: ModeContext = {
    identityId,
    activeMode: mode,
    updatedAt: now,
    effects: getModeEffects(mode),
    lastTrigger: trigger,
  };

  currentContext = next;
  recordModeSwitchTimestamp(now);
  emitModeChange({ previous, next, trigger });

  return next;
};

export const evaluateModeTriggers = (
  identityId: string,
  triggers: ModeTrigger[],
): ModeContext => {
  const manualOverride = triggers.find((trigger) => trigger.source === 'manual');
  if (manualOverride) {
    return setMode(identityId, manualOverride.targetMode, manualOverride);
  }

  const preferredMode = resolvePreferredMode(triggers.map((trigger) => trigger.targetMode));
  if (!preferredMode) {
    return currentContext ?? initializeMode(identityId);
  }

  const primaryTrigger = selectPrimaryTrigger(triggers, preferredMode);
  return setMode(identityId, preferredMode, primaryTrigger);
};

export const getMode = (): ModeContext | undefined => currentContext;

export const onModeChange = (listener: (event: ModeChangeEvent) => void): void => {
  listeners.push(listener);
};

const emitModeChange = (event: ModeChangeEvent): void => {
  listeners.forEach((listener) => listener(event));
};
