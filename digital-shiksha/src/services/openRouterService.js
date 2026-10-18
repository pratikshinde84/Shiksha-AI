// src/services/openRouterService.js
/**
 * Service wrapper for OpenRouter API.
 *
 * Key resolution priority (highest → lowest):
 *   1. Key saved by the user via the chatbot Settings panel (sessionStorage)
 *   2. VITE_OPENROUTER_API_KEY environment variable (.env / Vercel env var)
 *
 * This means the app works out-of-the-box on both localhost and Vercel as long
 * as the env variable is set, while still letting users override it at runtime.
 */

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

// Read the env variable once at module load time.
// Vite exposes VITE_* variables through import.meta.env.
const ENV_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

export const openRouterService = {
  /**
   * Save a user-supplied key for this browser session (overrides env key).
   * @param {string} apiKey
   */
  setApiKey(apiKey) {
    if (apiKey && apiKey.trim()) {
      sessionStorage.setItem('openRouterApiKey', apiKey.trim());
    }
  },

  /**
   * Retrieve the active API key.
   * Returns the sessionStorage value first; falls back to the env variable.
   * @returns {string}
   */
  getApiKey() {
    const sessionKey = sessionStorage.getItem('openRouterApiKey') || '';
    return sessionKey || ENV_API_KEY;
  },

  /**
   * Returns true if any key is available (env or session).
   */
  hasApiKey() {
    return Boolean(this.getApiKey());
  },

  /**
   * Perform a chat completion request via OpenRouter.
   * @param {{ model: string, messages: Array<{role:string, content:string}> }} opts
   * @returns {Promise<string>} – assistant reply text
   */
  async chat({ model, messages }) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error(
        'OpenRouter API key not configured. ' +
        'Add VITE_OPENROUTER_API_KEY to your .env file or enter it in the chatbot Settings.'
      );
    }

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // Recommended by OpenRouter for app identification
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Digital Shiksha',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      let errMsg = response.statusText;
      try {
        const err = await response.json();
        errMsg = err?.error?.message || errMsg;
      } catch (_) { /* ignore parse errors */ }
      throw new Error(`OpenRouter error ${response.status}: ${errMsg}`);
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content?.trim() || '';
  },
};
