import { OrchestratorJob } from './job.types';

const queue: OrchestratorJob[] = [];

// TODO: Replace with durable storage backed by Supabase
export const enqueueJob = (job: OrchestratorJob): void => {
  queue.push(job);
};

export const nextJob = (): OrchestratorJob | undefined => queue.shift();
