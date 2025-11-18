import { UiSurface } from './ui.types';

// TODO: Bridge runtime UI shell (web/native) once renderer is selected
export const bootstrapShell = (): UiSurface => ({
  id: 'shell',
  name: 'Unified Shell',
});
