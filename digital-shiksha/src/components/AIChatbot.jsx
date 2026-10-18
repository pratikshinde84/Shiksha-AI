// src/components/AIChatbot.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { openRouterService } from '../services/openRouterService';
import { LanguageContext } from '../context/LanguageContext';
import { X, Send, Bot, User } from 'lucide-react';

/**
 * Floating AI assistant button that opens a chat panel.
 * The component handles API key entry, language selection, and basic error handling.
 */
export const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {role:'user'|'assistant', content:string}
  const [input, setInput] = useState('');
  const [model, setModel] = useState('meta-llama/llama-3.1-8b-instruct');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState(null);
  const { lang } = useContext(LanguageContext);
  const panelRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [messages, open]);

  const toggleChat = () => setOpen(!open);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setError(null);
    try {
      const reply = await openRouterService.chat({
        model,
        messages: [...messages, userMsg]
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I could not reach the AI service. Please check your API key or try again later.' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const saveApiKey = () => {
    openRouterService.setApiKey(apiKey);
    setApiKey('');
  };

  // Simple translations for UI strings
  const ui = {
    en: { title: 'Shiksha AI', placeholder: 'Ask a question…', settings: 'Settings', model: 'Model', apiKey: 'API Key', save: 'Save', close: 'Close' },
    hi: { title: 'शिक्षा एआई', placeholder: 'प्रश्न पूछें…', settings: 'सेटिंग्स', model: 'मॉडल', apiKey: 'एपीआई कुंजी', save: 'सहेजें', close: 'बंद करें' },
    mr: { title: 'शिक्षा एआय', placeholder: 'प्रश्न विचारा…', settings: 'सेटिंग्ज', model: 'मॉडेल', apiKey: 'एपीआय की', save: 'जतन करा', close: 'बंद करा' }
  }[lang];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      <button
        onClick={toggleChat}
        className="btn-primary rounded-full p-3 shadow-lg flex items-center justify-center"
        aria-label="Open AI assistant"
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="mt-2 w-80 max-h-96 bg-white rounded-xl shadow-lg flex flex-col glass">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold gradient-text text-sm">{ui.title}</h3>
            <button onClick={toggleChat} className="text-gray-500 hover:text-primary"><X className="h-4 w-4" /></button>
          </div>
          <div ref={panelRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'} `}>
                  {msg.content}
                </div>
              </div>
            ))}
            {error && <p className="text-red-600 text-xs">{error}</p>}
          </div>
          {/* Settings panel */}
          <details className="p-2 border-t">
            <summary className="cursor-pointer text-sm text-gray-600">{ui.settings}</summary>
            <div className="mt-2 space-y-2">
              <label className="block text-xs text-gray-700">{ui.model}</label>
              <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-1 border rounded text-xs" />
              <label className="block text-xs text-gray-700">{ui.apiKey}</label>
              <div className="flex space-x-1">
                <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="flex-1 p-1 border rounded text-xs" placeholder="••••" />
                <button onClick={saveApiKey} className="btn-outline text-xs">{ui.save}</button>
              </div>
            </div>
          </details>
          <div className="p-2 border-t flex space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              placeholder={ui.placeholder}
              className="flex-1 p-1 border rounded text-xs resize-none"
            />
            <button onClick={handleSend} className="btn-primary p-1" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
