/**
 * @file writableCalendars.ts
 * @brief Shared lookup for calendar sources that can accept newly created events.
 *
 * @description
 * The create-event modal, the global default-calendar setting, and the
 * per-workspace default-calendar override all need the same list: sources whose
 * provider reports the `canCreate` capability, in settings order. Keeping one
 * implementation avoids the three copies drifting apart as providers change
 * their capabilities.
 *
 * @license See LICENSE.md
 */

import { PluginState } from '../core/PluginState';
import { CalendarInfo } from '../types/calendar_settings';

export interface WritableCalendarOption {
  id: string;
  type: CalendarInfo['type'];
  name: string;
}

/**
 * Lists calendar sources that can create events, in settings order.
 *
 * @returns Writable sources; empty when no configured calendar accepts writes.
 */
export function listWritableCalendars(): WritableCalendarOption[] {
  const registry = PluginState.getProviderRegistry();
  return registry
    .getAllSources()
    .filter(source => source.type !== 'FOR_TEST_ONLY')
    .map(info => {
      const instance = registry.getInstance(info.id);
      if (!instance) return null;
      if (!instance.getCapabilities().canCreate) return null;

      return {
        id: info.id,
        type: info.type,
        name: info.name || ''
      };
    })
    .filter(option => option !== null);
}
