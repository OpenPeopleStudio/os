import { ActiveIdentityState } from './identity.types';

let cachedIdentity: ActiveIdentityState | null = null;

export const loadActiveIdentity = async (): Promise<ActiveIdentityState> => {
  // TODO: wire up real connectors later
  // placeholder: minimal composition of state
  const profile = { id: 'pending-init' };
  const session = { sessionId: 'dev-session', profileId: 'pending-init', issuedAt: new Date() };
  const persona = 'Personal';
  const device = { deviceId: 'dev-device', platform: 'web', label: 'Sol' };

  cachedIdentity = { profile, session, persona, device };
  return cachedIdentity;
};

export const getActiveIdentity = (): ActiveIdentityState | null => {
  return cachedIdentity;
};
