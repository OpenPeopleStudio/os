import { ModeContext, Mode } from './mode.types';

let currentContext: ModeContext | undefined;

// TODO: Persist context state in Supabase for multi-device sync
export const setMode = (identityId: string, mode: Mode): ModeContext => {
  currentContext = {
    identityId,
    activeMode: mode,
    updatedAt: new Date(),
  };
  return currentContext;
};

export const getMode = (): ModeContext | undefined => currentContext;
