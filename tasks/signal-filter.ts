import { TaskItem } from './task.types';

// TODO: Build proper prioritization heuristics driven by AI reflection
export const splitSignalFromNoise = (tasks: TaskItem[]): {
  signal: TaskItem[];
  noise: TaskItem[];
} => {
  const signal = tasks.filter((task) => task.status === 'signal');
  const noise = tasks.filter((task) => task.status !== 'signal');
  return { signal, noise };
};
