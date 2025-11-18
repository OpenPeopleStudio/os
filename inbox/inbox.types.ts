// TODO: Define email/SMS unified message schema for Supabase storage
export interface InboxMessage {
  id: string;
  source: 'email' | 'sms';
  subject?: string;
  body?: string;
}
