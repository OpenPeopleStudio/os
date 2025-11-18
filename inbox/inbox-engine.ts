import { InboxMessage } from './inbox.types';

// TODO: Extend to support threading, labeling, and AI triage
export const createMessageDraft = (partial: Partial<InboxMessage>): InboxMessage => ({
  id: partial.id ?? `msg-${Date.now()}`,
  source: partial.source ?? 'email',
  subject: partial.subject,
  body: partial.body,
});

export const listInbox = async (): Promise<InboxMessage[]> => {
  // TODO: Pull inbox data from Supabase views
  return [];
};
