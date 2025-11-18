import { Mode } from './mode.types';

// TODO: Pull allowed mode definitions from configuration or Supabase
const registeredModes: Mode[] = ['Mars', 'Earth', 'Sol'];

export const listModes = (): Mode[] => registeredModes.slice();

export const isModeSupported = (mode: Mode): boolean => registeredModes.includes(mode);
