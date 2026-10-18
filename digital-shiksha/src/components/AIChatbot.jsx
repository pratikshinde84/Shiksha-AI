// src/components/AIChatbot.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { openRouterService } from '../services/openRouterService';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { X, Send, Bot } from 'lucide-react';

/**
 * Floating AI assistant that opens a chat panel above the trigger button.
 */
export const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('meta-llama/llama-3.1-8b-instruct');
  const [apiKey, setApiKey] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [keyConfigured, setKeyConfigured] = useState(false);
  const { lang } = useContext(LanguageContext);
  const messagesEndRef = useRef(null);

  // Check on mount whether a key is already available (env or session)
  useEffect(() => {
    setKeyConfigured(openRouterService.hasApiKey());
  }, []);

  // Scroll to newest message
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const t = translations[lang] || translations.en;

  // Extra chatbot-specific UI strings not in translations.js
  const ui = {
    en: { title: 'Shiksha AI', placeholder: 'Ask a question…', thinking: 'Thinking…' },
    hi: { title: 'शिक्षा एआई', placeholder: 'प्रश्न पूछें…', thinking: 'सोच रहा है…' },
    mr: { title: 'शिक्षा एआय', placeholder: 'प्रश्न विचारा…', thinking: 'विचार करत आहे…' },
  }[lang] || { title: 'Shiksha AI', placeholder: 'Ask a question…', thinking: 'Thinking…' };

  const toggleChat = () => setOpen((v) => !v);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setError(null);
    setSending(true);

    try {
      const reply = await openRouterService.chat({
        model,
        messages: [...messages, userMsg],
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not reach the AI service. Please check your API key in Settings.',
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      openRouterService.setApiKey(apiKey.trim());
      setKeyConfigured(true);
      setApiKey('');
      setError(null);
    }
  };

  return (
    // Position relative so the panel can use absolute bottom-full
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat panel — opens ABOVE the button */}
      {open && (
        <div className="mb-3 w-80 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          style={{ maxHeight: 'min(480px, calc(100vh - 100px))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-primary text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <h3 className="font-semibold text-sm">{ui.title}</h3>
            </div>
            <button
              onClick={toggleChat}
              className="hover:opacity-80 transition"
              aria-label={t.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-4 px-2">
                <p className="text-xs text-gray-400 mb-1">
                  Ask anything about digital literacy!
                </p>
                {!keyConfigured && (
                  <p className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-lg px-2 py-1.5 mt-2">
                    ⚠ Open Settings below to add your OpenRouter API key.
                  </p>
                )}
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-bl-sm text-sm text-gray-500 shadow-sm">
                  <span className="typing-cursor">{ui.thinking}</span>
                </div>
              </div>
            )}
            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Settings */}
          <details className="border-t bg-white">
            <summary className="cursor-pointer text-xs text-gray-500 px-3 py-2 hover:bg-gray-50 select-none">
              ⚙ {t.settings}
            </summary>
            <div className="px-3 pb-3 space-y-2 bg-white">
              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.model}</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full p-1.5 border border-gray-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.apiKey}</label>
                {/* Show current key status */}
                <div className={`text-xs px-2 py-1 rounded mb-1.5 ${keyConfigured ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  {keyConfigured ? '✓ API key is configured' : '⚠ No API key found — enter one below or set VITE_OPENROUTER_API_KEY in .env'}
                </div>
                <div className="flex gap-1">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={keyConfigured ? 'Override key…' : 'sk-or-v1-…'}
                    className="flex-1 p-1.5 border border-gray-300 rounded text-xs"
                  />
                  <button
                    onClick={saveApiKey}
                    disabled={!apiKey.trim()}
                    className="px-2 py-1 bg-primary text-white text-xs rounded hover:opacity-90 disabled:opacity-40"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
            </div>
          </details>

          {/* Input */}
          <div className="flex items-end gap-2 p-2 border-t bg-white">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={ui.placeholder}
              disabled={sending}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ maxHeight: '80px' }}
            />
            <button
              onClick={handleSend}
              disabled={sending || !input.trim()}
              className="p-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-40 transition shrink-0"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={toggleChat}
        className="btn-primary rounded-full p-3 shadow-lg"
        aria-label="Open AI assistant"
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </button>
    </div>
  );
};
