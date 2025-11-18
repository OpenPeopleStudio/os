import { ReflectionEntry } from './reflection.types';

// TODO: Integrate AI models for reflective summaries
export const captureReflection = (context: string): ReflectionEntry => ({
  id: `reflection-${Date.now()}`,
  context,
  createdAt: new Date(),
});

export const listReflections = async (): Promise<ReflectionEntry[]> => {
  // TODO: Fetch reflections from Supabase
  return [];
};
