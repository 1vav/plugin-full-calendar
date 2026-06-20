/**
 * @file plotly-custom.ts
 * @brief Dynamic loader and proxy facade for the `plotly.js` library.
 *
 * @description
 * Creates a transparent Proxy for the `Plotly` object and manages local caching in the vault.
 * Handles both bundled (Community) and dynamically loaded (Lean) configurations seamlessly.
 *
 * @license See LICENSE.md
 */

import { App } from 'obsidian';
import { loadCachedScript } from '../../utils/loadScript';
import type * as PlotlyTypes from 'plotly.js';

// Extend the global Window interface to type window.Plotly safely without any casts
declare global {
  interface Window {
    Plotly?: typeof PlotlyTypes;
  }
}

interface ImportModule {
  default?: typeof PlotlyTypes;
}

let plotlyModule: typeof PlotlyTypes | null = null;
let plotlyPromise: Promise<typeof PlotlyTypes> | null = null;

/**
 * Triggers loading of the Plotly charting library.
 * Bundled via esbuild and dynamically imported here to support lazy loading.
 * Falls back to local cached script loading if the bundled module is a stub (Lean build).
 */
export async function ensurePlotlyLoaded(app: App): Promise<typeof PlotlyTypes> {
  if (plotlyModule) {
    return plotlyModule;
  }

  if (plotlyPromise) {
    return plotlyPromise;
  }

  plotlyPromise = (async () => {
    try {
      const module = await import('plotly.js');
      if (process.env.BUILD_LEAN === 'true') {
        // Fall back to dynamic script loading from cache/CDN (Lean build)
        const filename = 'plotly-3.5.1.min.js';
        const cdnUrl = 'https://cdn.plot.ly/plotly-3.5.1.min.js';
        await loadCachedScript(app, filename, cdnUrl);
        plotlyModule = window.Plotly || null;
      } else {
        const rawPlotly = (module as ImportModule).default || module;
        plotlyModule = rawPlotly;
        window.Plotly = plotlyModule;
      }

      if (!plotlyModule) {
        throw new Error('Plotly loaded but module is not defined.');
      }
      return plotlyModule;
    } catch (err) {
      plotlyPromise = null; // Allow retry on failure
      throw err;
    }
  })();

  return plotlyPromise;
}

/**
 * Transparent proxy that delegates all Plotly module operations to the loaded Plotly instance.
 * Allows other chart files (like plotter.ts) to interact with Plotly statically.
 */
const PlotlyProxy = new Proxy({} as typeof PlotlyTypes, {
  get(target, prop) {
    const activePlotly = window.Plotly || plotlyModule;
    if (!activePlotly) {
      throw new Error(
        'Plotly charting library is not loaded yet! Please await ensurePlotlyLoaded() first.'
      );
    }

    const activePlotlyObj = activePlotly as Record<string | symbol, unknown>;
    const val = activePlotlyObj[prop];
    if (typeof val === 'function') {
      return (val as (...args: unknown[]) => unknown).bind(activePlotly);
    }
    return val;
  }
});

export default PlotlyProxy;
