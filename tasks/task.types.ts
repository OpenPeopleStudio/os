// TODO: Align Things-3 inspired task schema with Supabase tables
export interface TaskItem {
  id: string;
  title: string;
  status: 'signal' | 'noise' | 'queued';
}
