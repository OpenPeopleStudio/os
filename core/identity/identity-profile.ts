import { IdentityProfile } from './identity.types';

// TODO: Connect to Supabase profile tables once schema is defined
export const createEmptyProfile = (): IdentityProfile => ({
  id: 'pending-init',
});

export const loadIdentityProfile = async (profileId: string): Promise<IdentityProfile> => {
  // TODO: Replace with Supabase fetch and caching strategy
  return { id: profileId };
};
