// src/components/AIChatbot.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { openRouterService } from '../services/openRouterService';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { X, Send, Bot, Sparkles, Settings, ChevronDown, RefreshCw } from 'lucide-react';

/* ─── Suggested starter prompts ─────────────────────────────────────── */
const SUGGESTIONS = [
  'What is the internet?',
  'How do I stay safe online?',
  'What is UPI payment?',
  'How to create a strong password?',
];

/* ─── Typing dots animation component ───────────────────────────────── */
const TypingDots = () => (
  <div className="flex items-center gap-1 py-1">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: '#94a3b8',
          display: 'inline-block',
          animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
  </div>
);

/* ─── Avatar ─────────────────────────────────────────────────────────── */
const Avatar = ({ role }) =>
  role === 'assistant' ? (
    <div
      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
      style={{ background: 'linear-gradient(135deg,#2563EB,#10B981)' }}
    >
      AI
    </div>
  ) : (
    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
      U
    </div>
  );

/* ─── Main component ─────────────────────────────────────────────────── */
export const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('meta-llama/llama-3.1-8b-instruct');
  const [apiKey, setApiKey] = useState('');
  const [sending, setSending] = useState(false);
  const [keyConfigured, setKeyConfigured] = useState(false);
  const { lang } = useContext(LanguageContext);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setKeyConfigured(openRouterService.hasApiKey());
  }, []);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, sending]);

  const t = translations[lang] || translations.en;

  const ui = {
    en: { title: 'Shiksha AI', sub: 'Digital literacy assistant', placeholder: 'Ask me anything about digital skills…' },
    hi: { title: 'शिक्षा एआई', sub: 'डिजिटल साक्षरता सहायक', placeholder: 'डिजिटल कौशल के बारे में पूछें…' },
    mr: { title: 'शिक्षा एआय', sub: 'डिजिटल साक्षरता सहाय्यक', placeholder: 'डिजिटल कौशल्याबद्दल विचारा…' },
  }[lang] || { title: 'Shiksha AI', sub: 'Digital literacy assistant', placeholder: 'Ask me anything about digital skills…' };

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const userMsg = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    try {
      const reply = await openRouterService.chat({ model, messages: [...messages, userMsg] });
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ ${e.message}`, isError: true },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  // Auto-resize textarea
  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      openRouterService.setApiKey(apiKey.trim());
      setKeyConfigured(true);
      setApiKey('');
      setShowSettings(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <>
      {/* Keyframe for typing dots — injected once */}
      <style>{`
        @keyframes chatDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

        {/* ── Chat window ─────────────────────────────────────────────── */}
        {open && (
          <div
            className="mb-4 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: 380,
              height: 'min(600px, calc(100vh - 100px))',
              boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.15)',
              background: '#fff',
            }}
          >
            {/* ── Header ──────────────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#2563EB 0%,#1d4ed8 50%,#10B981 100%)' }}
            >
              <div className="flex items-center gap-3">
                {/* Animated logo */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  {/* Online dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm leading-none">{ui.title}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{ui.sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition"
                    title="Clear chat"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setShowSettings((v) => !v)}
                  className={`p-1.5 rounded-lg transition ${showSettings ? 'bg-white/25 text-white' : 'text-white/70 hover:text-white hover:bg-white/15'}`}
                  title="Settings"
                >
                  <Settings className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Settings panel (collapsible) ────────────────────────── */}
            {showSettings && (
              <div className="flex-shrink-0 bg-gray-50 border-b border-gray-100 px-4 py-3 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Model</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">API Key</label>
                  <div className={`text-xs px-2.5 py-1.5 rounded-lg mb-2 font-medium ${keyConfigured ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {keyConfigured ? '✓ API key active' : '⚠ No key — add one below'}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-or-v1-…"
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      onKeyDown={(e) => e.key === 'Enter' && saveApiKey()}
                    />
                    <button
                      onClick={saveApiKey}
                      disabled={!apiKey.trim()}
                      className="px-3 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Messages area ────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ background: '#f8fafc' }}>

              {/* Empty state */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-4 pb-2">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#2563EB,#10B981)' }}
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-800 text-base">{ui.title}</p>
                    <p className="text-gray-500 text-xs mt-1 max-w-[200px] leading-relaxed">
                      Your AI guide for digital literacy. Ask me anything!
                    </p>
                  </div>

                  {/* Suggested prompts */}
                  <div className="w-full space-y-2 mt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="w-full text-left text-xs px-3 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-primary hover:bg-blue-50 hover:text-primary transition text-gray-600 font-medium"
                      >
                        {s} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar role={msg.role} />
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white rounded-2xl rounded-br-sm'
                        : msg.isError
                        ? 'bg-red-50 text-red-700 border border-red-200 rounded-2xl rounded-bl-sm'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm shadow-sm'
                    }`}
                    style={
                      msg.role === 'user'
                        ? { background: 'linear-gradient(135deg,#2563EB,#1d4ed8)' }
                        : undefined
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {sending && (
                <div className="flex items-end gap-2">
                  <Avatar role="assistant" />
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input bar ────────────────────────────────────────────── */}
            <div
              className="flex-shrink-0 px-3 py-3 border-t border-gray-100"
              style={{ background: '#fff' }}
            >
              <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder={ui.placeholder}
                  disabled={sending}
                  className="flex-1 bg-transparent text-sm text-gray-800 resize-none focus:outline-none placeholder-gray-400 leading-relaxed"
                  style={{ maxHeight: 120, minHeight: 24 }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={sending || !input.trim()}
                  className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition"
                  style={{
                    background: input.trim() && !sending
                      ? 'linear-gradient(135deg,#2563EB,#1d4ed8)'
                      : '#e2e8f0',
                  }}
                  aria-label="Send"
                >
                  <Send className={`h-3.5 w-3.5 ${input.trim() && !sending ? 'text-white' : 'text-gray-400'}`} />
                </button>
              </div>
              <p className="text-center text-gray-400 text-xs mt-2">
                Shift+Enter for new line · Enter to send
              </p>
            </div>
          </div>
        )}

        {/* ── Floating trigger button ──────────────────────────────────── */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative flex items-center justify-center w-14 h-14 rounded-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: open
              ? '#64748b'
              : 'linear-gradient(135deg,#2563EB 0%,#10B981 100%)',
            boxShadow: open
              ? '0 4px 16px rgba(0,0,0,0.2)'
              : '0 8px 32px rgba(37,99,235,0.45)',
          }}
          aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        >
          {open ? (
            <ChevronDown className="h-6 w-6" />
          ) : (
            <>
              <Sparkles className="h-6 w-6" />
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-2xl animate-ping"
                style={{ background: 'rgba(37,99,235,0.3)', animationDuration: '2s' }}
              />
            </>
          )}
        </button>
      </div>
    </>
  );
};
