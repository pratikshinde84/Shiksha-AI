// src/services/openRouterService.js
/**
 * Service wrapper for OpenRouter API.
 * The API key is stored only in sessionStorage (or memory) – never persisted.
 */

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

export const openRouterService = {
    /**
     * Set the API key for the current session.
     * @param {string} apiKey
     */
    setApiKey(apiKey) {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('openRouterApiKey', apiKey);
        }
    },

    /**
     * Get the stored API key for the current session.
     * @returns {string|null}
     */
    getApiKey() {
        return typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('openRouterApiKey') : null;
    },

    /**
     * Perform a chat completion request.
     * @param {string} model – e.g. "meta-llama/llama-3.1-8b-instruct"
     * @param {Array<{role:string, content:string}>} messages – conversation history
     * @returns {Promise<string>} – assistant reply text
     */
    async chat({ model, messages }) {
        const apiKey = this.getApiKey();
        if (!apiKey) {
            throw new Error('OpenRouter API key not configured');
        }
        const payload = {
            model,
            messages,
            temperature: 0.7,
            max_tokens: 1024,
            stream: false
        };
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(`OpenRouter error: ${response.status} ${err?.error?.message || response.statusText}`);
        }
        const data = await response.json();
        // OpenRouter returns an array of choices
        const reply = data?.choices?.[0]?.message?.content?.trim();
        return reply || '';
    }
};
