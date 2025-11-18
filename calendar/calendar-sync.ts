import { normalizeEvent } from './calendar-engine';
import { EventProvider, NormalizedEvent } from './calendar.types';

// TODO: Implement provider sync (Google, iCloud) through Supabase functions
export interface ProviderAdapter {
  provider: EventProvider;
  fetchEvents: () => Promise<any[]>;
}

const providers: ProviderAdapter[] = [];

export const registerProvider = (adapter: ProviderAdapter): void => {
  providers.push(adapter);
};

export const listProviders = (): ProviderAdapter[] => providers.slice();

export const syncCalendarProviders = async (): Promise<NormalizedEvent[]> => {
  const all: NormalizedEvent[] = [];
  for (const adapter of providers) {
    const raw = await adapter.fetchEvents();
    const normalized = raw.map((e) => normalizeEvent(e, adapter.provider));
    all.push(...normalized);
  }
  return all;
};
