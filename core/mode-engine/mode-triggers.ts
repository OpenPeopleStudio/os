import { getModePriority } from './mode-registry';
import { Mode, ModeTrigger } from './mode.types';

export const createManualOverrideTrigger = (targetMode: Mode): ModeTrigger => ({
  source: 'manual',
  targetMode,
  confidence: 1,
  timestamp: new Date(),
});

export const detectLocationTrigger = (): ModeTrigger | undefined => undefined;

export const detectCalendarTrigger = (): ModeTrigger | undefined => undefined;

export const detectDeviceTrigger = (): ModeTrigger | undefined => undefined;

export const detectDeepFocusTrigger = (): ModeTrigger | undefined => undefined;

export const detectStressTrigger = (): ModeTrigger | undefined => undefined;

export const selectPrimaryTrigger = (
  triggers: ModeTrigger[],
  targetMode: Mode,
): ModeTrigger | undefined => {
  const matchingTriggers = triggers.filter((trigger) => trigger.targetMode === targetMode);
  if (matchingTriggers.length === 0) return undefined;

  return matchingTriggers.reduce((best, candidate) => {
    const bestConfidence = best.confidence ?? 0;
    const candidateConfidence = candidate.confidence ?? 0;
    if (candidateConfidence !== bestConfidence) {
      return candidateConfidence > bestConfidence ? candidate : best;
    }

    const bestPriority = getModePriority(best.targetMode);
    const candidatePriority = getModePriority(candidate.targetMode);
    if (candidatePriority !== bestPriority) {
      return candidatePriority > bestPriority ? candidate : best;
    }

    const bestTimestamp = best.timestamp?.getTime() ?? 0;
    const candidateTimestamp = candidate.timestamp?.getTime() ?? 0;
    return candidateTimestamp > bestTimestamp ? candidate : best;
  }, matchingTriggers[0]);
};
