// TODO: Expand calendar event schema for Supabase storage
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export type EventProvider = 'google' | 'icloud' | 'outlook' | 'manual';

export interface NormalizedEvent {
  id: string;
  provider: EventProvider;
  title: string;
  start: Date;
  end: Date;
  sourceId?: string; // provider-specific ID
  persona?: string; // from identity layer
}
