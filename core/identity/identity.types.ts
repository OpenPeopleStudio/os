// TODO: Define identity models, Supabase row mappings, and caching contracts
export interface IdentityProfile {
  id: string;
  primaryEmail?: string;
  displayName?: string;
}

export interface IdentitySession {
  sessionId: string;
  profileId: string;
  issuedAt: Date;
}
