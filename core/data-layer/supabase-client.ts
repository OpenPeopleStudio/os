// TODO: Wire up Supabase client with environment configuration
export interface SupabaseClient {
  url: string;
  anonKey: string;
}

let client: SupabaseClient | null = null;

export const initSupabaseClient = (url: string, anonKey: string): SupabaseClient => {
  client = { url, anonKey };
  return client;
};

export const getSupabaseClient = (): SupabaseClient => {
  if (!client) {
    throw new Error('Supabase client not initialized');
  }
  return client;
};
