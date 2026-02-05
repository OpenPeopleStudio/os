// Mode engine shared types
export type Mode = 'Mars' | 'Earth' | 'Sol';

export type ModePriority = Record<Mode, number>;

export type ModeTriggerSource =
  | 'manual'
  | 'location'
  | 'calendar'
  | 'device'
  | 'deep_focus'
  | 'stress';

export interface ModeTrigger {
  source: ModeTriggerSource;
  targetMode: Mode;
  confidence?: number;
  metadata?: Record<string, unknown>;
  timestamp?: Date;
}

export interface NotificationEffects {
  allow: string[];
  suppress: string[];
}

export interface TaskEffects {
  priorityWeights: Record<string, number>;
}

export interface CalendarEffects {
  conflictRules: string[];
}

export interface InboxEffects {
  autoReplyBehavior: 'immediate' | 'delayed' | 'off';
}

export interface ReflectionEffects {
  weight: number;
}

export interface ModeEffects {
  notifications: NotificationEffects;
  tasks: TaskEffects;
  calendar: CalendarEffects;
  inbox: InboxEffects;
  reflection: ReflectionEffects;
}

export interface ModeContext {
  identityId: string;
  activeMode: Mode;
  updatedAt: Date;
  effects?: ModeEffects;
  lastTrigger?: ModeTrigger;
}

export interface ModeGuardResult {
  allowed: boolean;
  reason?: string;
}

export interface ModeChangeEvent {
  previous: ModeContext;
  next: ModeContext;
  trigger?: ModeTrigger;
}
