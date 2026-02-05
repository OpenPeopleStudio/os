import { CalendarEffects, InboxEffects, Mode, ModeEffects, NotificationEffects, ReflectionEffects, TaskEffects } from './mode.types';

const defaultNotificationEffects: NotificationEffects = {
  allow: [],
  suppress: [],
};

const defaultTaskEffects: TaskEffects = {
  priorityWeights: {},
};

const defaultCalendarEffects: CalendarEffects = {
  conflictRules: [],
};

const defaultInboxEffects: InboxEffects = {
  autoReplyBehavior: 'off',
};

const defaultReflectionEffects: ReflectionEffects = {
  weight: 1,
};

export const DEFAULT_MODE_EFFECTS: ModeEffects = {
  notifications: defaultNotificationEffects,
  tasks: defaultTaskEffects,
  calendar: defaultCalendarEffects,
  inbox: defaultInboxEffects,
  reflection: defaultReflectionEffects,
};

const modeEffectOverrides: Record<Mode, Partial<ModeEffects>> = {
  Mars: {
    notifications: { allow: ['swl', 'operations'], suppress: [] },
    tasks: { priorityWeights: {} },
    calendar: { conflictRules: [] },
    inbox: { autoReplyBehavior: 'delayed' },
    reflection: { weight: 1.0 },
  },
  Earth: {
    notifications: { allow: ['personal', 'family'], suppress: ['swl'] },
    inbox: { autoReplyBehavior: 'immediate' },
    reflection: { weight: 0.5 },
  },
  Sol: {
    notifications: { allow: ['research'], suppress: ['noise'] },
    inbox: { autoReplyBehavior: 'off' },
    reflection: { weight: 2.0 },
  },
};

const cloneNotificationEffects = (effects: NotificationEffects): NotificationEffects => ({
  allow: [...effects.allow],
  suppress: [...effects.suppress],
});

const cloneTaskEffects = (effects: TaskEffects): TaskEffects => ({
  priorityWeights: { ...effects.priorityWeights },
});

const cloneCalendarEffects = (effects: CalendarEffects): CalendarEffects => ({
  conflictRules: [...effects.conflictRules],
});

const cloneInboxEffects = (effects: InboxEffects): InboxEffects => ({
  autoReplyBehavior: effects.autoReplyBehavior,
});

const cloneReflectionEffects = (effects: ReflectionEffects): ReflectionEffects => ({
  weight: effects.weight,
});

export const mergeModeEffects = (base: ModeEffects, overrides?: Partial<ModeEffects>): ModeEffects => ({
  notifications: overrides?.notifications
    ? cloneNotificationEffects(overrides.notifications)
    : cloneNotificationEffects(base.notifications),
  tasks: overrides?.tasks ? cloneTaskEffects(overrides.tasks) : cloneTaskEffects(base.tasks),
  calendar: overrides?.calendar
    ? cloneCalendarEffects(overrides.calendar)
    : cloneCalendarEffects(base.calendar),
  inbox: overrides?.inbox ? cloneInboxEffects(overrides.inbox) : cloneInboxEffects(base.inbox),
  reflection: overrides?.reflection
    ? cloneReflectionEffects(overrides.reflection)
    : cloneReflectionEffects(base.reflection),
});

export const MODE_EFFECTS_BY_MODE: Record<Mode, ModeEffects> = {
  Mars: mergeModeEffects(DEFAULT_MODE_EFFECTS, modeEffectOverrides.Mars),
  Earth: mergeModeEffects(DEFAULT_MODE_EFFECTS, modeEffectOverrides.Earth),
  Sol: mergeModeEffects(DEFAULT_MODE_EFFECTS, modeEffectOverrides.Sol),
};

export const buildModeEffects = (mode: Mode): ModeEffects =>
  MODE_EFFECTS_BY_MODE[mode] ?? DEFAULT_MODE_EFFECTS;

export const getModeAwareHelpers = (mode: Mode): Record<string, unknown> => ({
  effects: buildModeEffects(mode),
});
