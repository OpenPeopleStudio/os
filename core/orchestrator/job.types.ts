// TODO: Enumerate AI orchestration job payloads and states
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface OrchestratorJob {
  id: string;
  type: string;
  status: JobStatus;
  createdAt: Date;
}
