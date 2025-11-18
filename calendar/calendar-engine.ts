import { CalendarEvent } from './calendar.types';

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
