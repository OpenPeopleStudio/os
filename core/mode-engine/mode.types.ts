// TODO: Expand to cover all operational modes and guard-rails
export type Mode = 'Mars' | 'Earth' | 'Sol';

export interface ModeContext {
  identityId: string;
  activeMode: Mode;
  updatedAt: Date;
}
