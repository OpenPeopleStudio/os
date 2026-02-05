import { CalendarEvent, EventProvider, NormalizedEvent } from './calendar.types';

// TODO: Implement unified calendar logic across sources
export const createEvent = (partial: Partial<CalendarEvent>): CalendarEvent => ({
  id: partial.id ?? `event-${Date.now()}`,
  title: partial.title ?? 'Untitled Event',
  start: partial.start ?? new Date(),
  end: partial.end ?? new Date(),
});

export const listEvents = async (): Promise<CalendarEvent[]> => {
  // TODO: Query Supabase calendar view
  return [];
};

export const normalizeEvent = (raw: any, provider: EventProvider): NormalizedEvent => {
  // TODO: Map provider-specific fields into NormalizedEvent
  return {
    id: `evt-${Date.now()}`,
    provider,
    title: raw.title ?? 'Untitled',
    start: new Date(raw.start ?? Date.now()),
    end: new Date(raw.end ?? Date.now()),
    sourceId: raw.id ?? undefined,
  };
};

export const getUnifiedEvents = async (): Promise<NormalizedEvent[]> => {
  // TODO: Combine local cache + provider sync results
  return [];
};

export const detectConflicts = (events: NormalizedEvent[]): NormalizedEvent[][] => {
  // TODO: Basic conflict grouping placeholder
  return [];
};
