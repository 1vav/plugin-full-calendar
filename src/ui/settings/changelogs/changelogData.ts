// src/ui/changelogs/changelogData.ts

export interface Change {
  type: 'new' | 'fix' | 'improvement';
  title: string;
  description: string;
}

export interface Version {
  version: string;
  changes: Change[];
}

// Add new versions to the TOP of this array.
export const changelogData: Version[] = [
  {
    version: '0.13.2',
    changes: [
      {
        type: 'new',
        title: 'HOT: Link unique notes to Remote events with templates, metadata, and UI controls',
        description:
          'Added automatic [linked note](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/features/event-linked-notes/) creation for events with templates, metadata linking, and seamless integration across providers with UI controls. Supports [CalDAV](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/caldav/), [Google](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/gcal/), [Outlook](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/outlook/)'
      },
      {
        type: 'new',
        title: 'HOT-beta: Unified Reminders & FCR Companion for OS native notifications',
        description:
          'Introducing [centralized reminder engine](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/features/reminders/) with [FCR Reminder Companion App](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/features/fcr-reminder/) integration, including background sync, manual sync command, and improved reliability even when obsidian is not running.'
      },
      {
        type: 'new',
        title: 'ChronoAnalyser Demo for easy onboarding',
        description:
          'Introduced [ChronoAnalyser](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/chrono_analyser/introduction/) demo and added dynamic [i18n](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/features/i18n/)/[NLP](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/features/nlp/) asset loading with remote synchronization and automatic version-based refresh.'
      },
      {
        type: 'new',
        title: 'Tasks Global Query Filtering',
        description:
          'Added support for [Obsidian Tasks](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/tasks-plugin-integration/#supported-global-query-syntax) global query in backlog, enabling advanced filtering (tags, folders, priority, regex) via new setting.'
      },
      {
        type: 'new',
        title:
          '[CalDAV](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/caldav/) VTODO Support',
        description:
          'Extended [CalDAV](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/caldav/) to support tasks (VTODO) with improved fetching and consistency.'
      },
      {
        type: 'improvement',
        title:
          '[Timezone](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/architecture/system/features/timezone-architecture/) Handling (ICS/[CalDAV](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/caldav/))',
        description:
          'Improved [timezone](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/architecture/system/features/timezone-architecture/) accuracy for events with correct TZID handling and consistent UTC/local serialization.'
      },
      {
        type: 'improvement',
        title:
          '[Event Cache](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/architecture/system/eventcache/) & UI Refresh',
        description:
          'Optimized calendar refresh behavior to avoid full reloads, improving performance and visual stability during updates.'
      },
      {
        type: 'fix',
        title:
          '[Google](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/gcal/) & [Outlook](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/outlook/) Settings Issues',
        description:
          'Fixed provider settings state inconsistencies affecting calendar configuration and updates.'
      },
      {
        type: 'fix',
        title:
          '[Daily Note](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/dailynote/) Notify Serialization',
        description:
          'Resolved issue where reminder metadata was incorrectly stored as object strings.'
      },
      {
        type: 'fix',
        title: 'Instance Initialization & Sync',
        description:
          'Fixed issues where [calendar instances](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/architecture/calendars/architecture/) and sources were not updating correctly during initialization.'
      }
    ]
  },
  {
    version: '0.13.1',
    changes: [
      {
        type: 'improvement',
        title: 'Provider Lifecycle & Cleanup',
        description:
          'Added optional `teardown` method for CalendarProvider and ensured proper cleanup before registry reinitialization and shutdown to improve lifecycle stability.'
      },
      {
        type: 'improvement',
        title: 'Obsidian Community Lint & Document Handling',
        description:
          'Resolved lint issues and improved document handling in `getCalendarColors` and `renderCalendar` for more robust rendering behavior.'
      },
      {
        type: 'fix',
        title: 'Cache & Update Queue Stability',
        description:
          'Fixed `clearUpdateQueue` and improved update flush logic in CacheSubscriptionManager, ensuring correct handling of recurring child event deletions and burst update consistency.'
      },
      {
        type: 'fix',
        title: 'CalDAV Recurring Sync Collisions',
        description:
          'Resolved recurring sync-key collisions by using recurring event IDs instead of UID for RRULE events, preventing conflicts between series parents and RECURRENCE-ID exceptions. Includes regression test for yearly RRULE + exception scenarios. ([#260](https://github.com/obsidian-full-calendar-remastered/plugin-full-calendar/issues/260))'
      },
      {
        type: 'fix',
        title: 'TaskNotes Sync & Stability',
        description:
          'Stabilized provider-driven updates and drag/toggle sync. Improvements include: ignoring unclaimed file watcher updates, recovering missing provider-session mappings from cache, normalizing persistent IDs, coalescing burst updates, ignoring stale payloads, preferring canonical cache state, and ensuring scheduled changes remain authoritative even if time estimate persistence fails.'
      }
    ]
  },
  {
    version: '0.13.0',
    changes: [
      {
        type: 'new',
        title: 'Natural language processing (NLP)',
        description:
          'RECOMMENDED: Introducing [NLP](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/features/nlp/) for keyboard free orchestration.'
      },
      {
        type: 'new',
        title: 'Outlook Integration',
        description:
          'Added Outlook integration with full recurrence support and improved frontmatter/metadata handling. ([#259](https://github.com/obsidian-full-calendar-remastered/plugin-full-calendar/issues/259))'
      },
      {
        type: 'new',
        title: 'Major Feature Expansions',
        description:
          'Introduced a new [Milestones](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/features/milestones/) system, [TaskNotes integration](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/tasknotes/), and comprehensive Calendar [API](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/settings/api/) & Cache refactoring'
      },
      {
        type: 'improvement',
        title: 'i18n and Documentation',
        description:
          'Added Chinese (zh) localization and restructured the documentation suite for better navigation. ([#246](https://github.com/obsidian-full-calendar-remastered/plugin-full-calendar/issues/246))'
      },
      {
        type: 'improvement',
        title: 'Tasks Plugin Enhancements',
        description:
          'Added Day Planner format support, 24h time prefix serialization, deduplication for mirrored tasks, and fuzzy search in the tasks backlog.'
      },
      {
        type: 'fix',
        title: 'CalDAV & Event fixes',
        description:
          'Hardened mobile CalDAV authentication, improved import UX diagnostics, and resolved DailyNote UID collisions on move. Converting all-day to timed events now defaults to 1-hour duration.'
      }
    ]
  },
  {
    version: '0.12.9',
    changes: [
      {
        type: 'new',
        title: 'ActivityWatch sync',
        description:
          'Added a dedicated ActivityWatch sync engine with continuity-aware ingestion, auto-sync scheduling, and title templating.'
      },
      {
        type: 'improvement',
        title: 'Tasks integrations',
        description:
          'Checkout [Tasks Integration docs](https://obsidian-full-calendar-remastered.github.io/plugin-full-calendar/user/calendars/tasks-plugin-integration/). Expanded Tasks backlog and display settings, plus payload handling and workflow improvements. ([#142](https://github.com/obsidian-full-calendar-remastered/plugin-full-calendar/issues/142), [#166](https://github.com/obsidian-full-calendar-remastered/plugin-full-calendar/issues/166), [#175](https://github.com/obsidian-full-calendar-remastered/plugin-full-calendar/issues/175))'
      },
      {
        type: 'improvement',
        title: 'Core sync identity',
        description:
          'Switched sync handling to keyed identity diffs with reverse lookup maps and safer continuity replacement to reduce churn and duplicate blocks.'
      },
      {
        type: 'improvement',
        title: 'Settings and calendar UX',
        description:
          'Updated settings navigation, calendar interactions, search behavior, and mobile responsiveness.'
      },
      {
        type: 'fix',
        title: 'Build, docs, and i18n',
        description:
          'Reduced startup and bundle overhead, refreshed locale loading, and added ActivityWatch architecture documentation.'
      }
    ]
  }
];
