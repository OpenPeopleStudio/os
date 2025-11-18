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

export type IdentityPersona =
  | 'SWL'
  | 'RealEstate'
  | 'OpenPeople'
  | 'Personal';

export interface DeviceContext {
  deviceId: string;
  platform: 'ios' | 'android' | 'mac' | 'web';
  label?: string; // e.g. Mars, Earth, Sol
}

export interface ActiveIdentityState {
  profile: IdentityProfile;
  session: IdentitySession;
  persona: IdentityPersona;
  device: DeviceContext;
}
