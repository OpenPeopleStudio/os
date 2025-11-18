import { IdentitySession } from './identity.types';

// TODO: Persist sessions via Supabase auth hooks
export const issueSession = (profileId: string): IdentitySession => ({
  sessionId: `session-${Date.now()}`,
  profileId,
  issuedAt: new Date(),
});

export const validateSession = async (sessionId: string): Promise<boolean> => {
  // TODO: Verify session state via Supabase policies
  return Boolean(sessionId);
};
