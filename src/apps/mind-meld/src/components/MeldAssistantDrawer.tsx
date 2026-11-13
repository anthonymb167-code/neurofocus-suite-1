import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Zap,
  Shield,
  HelpCircle,
  MessageSquare,
  X,
  FileText,
} from 'lucide-react';
import { ALEX_MELD_DIALOGUE } from '../data/presets';
import { ChatMessage } from '../types/framework';
import { ambientSound } from '../utils/audio';

interface MeldAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidatePurpose: string;
  answeredCount: number;
  dviScore: number;
}

export const MeldAssistantDrawer: React.FC<MeldAssistantDrawerProps> = ({
  isOpen,
  onClose,
  candidatePurpose,
  answeredCount,
  dviScore,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Welcome to the center. I am the Meld Assistant. If you are here, the noise has become louder than the signal. Tell me what you are working on, or state the exact weight you are carrying right now.",
      timestamp: 'Now',
      tag: 'reflection',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewingAlexTranscript, setViewingAlexTranscript] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, viewingAlexTranscript]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend API endpoint
      const response = await fetch('/api/meld-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
          userContext: {
            candidatePurpose,
            answeredCount,
            dvi: dviScore,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "Let's strip away the noise. What is the single hard empirical constraint holding you back right now?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      ambientSound.playSparkChime();
    } catch (err) {
      // Client-side fallback reflection
      const fallbackReply = generateClientReflection(text);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateClientReflection = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('status') || lower.includes('follower') || lower.includes('linkedin')) {
      return "That craving for external visibility is an ego trap. If you could build this completely anonymously with zero public credit, would you still dedicate your morning peak window to it?";
    }
    if (lower.includes('lost') || lower.includes('burnout') || lower.includes('stuck')) {
      return "When cognitive exhaustion sets in, drop long-term planning. Think back over the last month: what was a single five-minute moment where your shoulders actually dropped?";
    }
    return "That clarifies the tension. Let's test your baseline velocity: what complex craft do you execute measurably faster or cleaner than the average person in your field?";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Meld Assistant</span>
              <span className="text-[10px] font-mono text-cyan-400 font-normal">
                v1.0 Online
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Cognitive Catalyst & Reflective Partner</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewingAlexTranscript(!viewingAlexTranscript)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
              viewingAlexTranscript
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Inspect realistic full dialogue transcript with Alex"
          >
            {viewingAlexTranscript ? 'Back to Live' : "Alex's Transcript"}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Catalyst Triggers Strip */}
      <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-950/30 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => handleSendMessage("Run the Anonymity Test on what I'm avoiding building.")}
          className="whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
        >
          🛡️ Anonymity Probe
        </button>
        <button
          onClick={() => handleSendMessage("Probe my behavioral friction: what specific task energizes my brain?")}
          className="whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
        >
          ⚡ Friction Probe
        </button>
        <button
          onClick={() => handleSendMessage("Trigger a Cross-Species Sensor Flip: if I viewed my obstacle through a feline slit aperture, what cuboid edges am I ignoring?")}
          className="whitespace-nowrap px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-mono border border-amber-500/30 cursor-pointer"
        >
          🐾 Sensor Flip
        </button>
        <button
          onClick={() => handleSendMessage("Trigger a Stochastic Break: give me an arbitrary physical constraint shock.")}
          className="whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
        >
          🎲 Stochastic Break
        </button>
      </div>

      {/* Chat Messages Body */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {viewingAlexTranscript ? (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <span className="font-bold block mb-1">REFERENCE CASE: Alex (Age 32, Project Manager)</span>
              Demonstrating the 4-Filter journey collapsing corporate meeting static into a quiet workflow-auditing toolkit.
            </div>

            {ALEX_MELD_DIALOGUE.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-slate-800 text-slate-100 rounded-tr-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3.5 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-slate-100 rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-2 text-xs text-slate-400 items-center pl-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[11px]">Meld Assistant is distilling signal...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak directly to the Meld Assistant..."
          className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
