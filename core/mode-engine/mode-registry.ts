import { MODE_EFFECTS_BY_MODE, buildModeEffects } from './mode-effects';
import { Mode, ModeEffects, ModePriority } from './mode.types';

// TODO: Pull allowed mode definitions from configuration or Supabase
const registeredModes: Mode[] = ['Mars', 'Earth', 'Sol'];

export const MODE_PRIORITIES: ModePriority = {
  Mars: 3,
  Sol: 2,
  Earth: 1,
};

export const MODE_EFFECTS: Record<Mode, ModeEffects> = MODE_EFFECTS_BY_MODE;

export const listModes = (): Mode[] => registeredModes.slice();

export const isModeSupported = (mode: Mode): boolean => registeredModes.includes(mode);

export const getModePriority = (mode: Mode): number => MODE_PRIORITIES[mode] ?? 0;

export const resolvePreferredMode = (modes: Mode[]): Mode | undefined => {
  const supportedModes = modes.filter(isModeSupported);
  if (supportedModes.length === 0) return undefined;

  return supportedModes.reduce((highest, candidate) => {
    const currentPriority = getModePriority(candidate);
    const highestPriority = getModePriority(highest);
    return currentPriority > highestPriority ? candidate : highest;
  }, supportedModes[0]);
};

export const getModeEffects = (mode: Mode): ModeEffects => buildModeEffects(mode);
