import { nextJob } from './job-queue';
import { OrchestratorJob } from './job.types';

// TODO: Integrate AI toolchain scheduling and telemetry
export const runPendingJobs = async (): Promise<void> => {
  let job: OrchestratorJob | undefined;
  while ((job = nextJob())) {
    await handleJob(job);
  }
};

const handleJob = async (job: OrchestratorJob): Promise<void> => {
  // TODO: Route job types to AI orchestration modules
  void job;
};
