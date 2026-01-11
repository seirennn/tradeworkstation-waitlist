'use client';

import { UnicornBackground } from "@/components/UnicornBackground";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { MousePointer2 } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          setStatus('success'); // Treat duplicate as success to not discourage user
          setMessage("You're already on the list!");
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage("You're in! We'll be in touch.");
        setEmail('');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <UnicornBackground />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

        {/* Top Pill - Rebranded */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl mb-6">
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="text-white">TradeWorkstation</span>
            <span className="w-px h-2.5 bg-white/20"></span>
            <span className="text-zinc-500">Waitlist</span>
          </span>
        </div>

        {/* Hero Text - Pixel Perfect Typography */}
        <div className="space-y-0 leading-[0.8]">
          <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tighter text-white drop-shadow-sm">
            Coming soon
          </h1>
          <h1 className="text-5xl md:text-7xl text-white/90 drop-shadow-sm">
            for <span className="italic font-serif">Completely Free.</span>
          </h1>
        </div>

        {/* Subtext - Refined */}
        <p className="max-w-md mx-auto text-sm md:text-[15px] text-zinc-400 font-light leading-tight tracking-wide">
          The Best fucking Trade Journal & Analytics Tool Ever Built <br className="hidden md:block" />
          Join the waitlist to be notified when we launch.
        </p>

        {/* Input Form - High Quality Glassmorphism */}
        <div className="w-full max-w-md mt-8">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-1.5 bg-[#1a1a1a]/40 border border-white/5 rounded-xl backdrop-blur-md shadow-2xl transition-all focus-within:bg-[#1a1a1a]/60 focus-within:border-white/10 ring-1 ring-white/5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-400 px-4 min-w-0 font-light tracking-wide"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-5 py-2.5 bg-[#ededed] text-black text-[13px] font-semibold rounded-lg hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : (status === 'success' ? 'Joined!' : 'Get Notified')}
            </button>
          </form>
          {message && (
            <div className={`mt-4 text-xs font-medium tracking-wide animate-in fade-in slide-in-from-top-2 ${status === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {message}
            </div>
          )}
        </div>

      </div>

      {/* Footer - Socials */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">

        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium opacity-80 backdrop-blur-sm">Join the Community</span>

        <div className="flex justify-center items-center gap-6 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/5 shadow-lg">
          <a
            href="https://discord.gg/McEB8ueARD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            title="Join our Discord"
          >
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.2 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09 0 .11a13.1 13.1 0 0 1-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.29-8.44-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.85 2.12-1.89 2.12z" />
            </svg>
          </a>

          <a
            href="https://x.com/tradewrkstation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            title="Follow us on X"
          >
            {/* X Logo */}
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/tradeworkstation/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-200 hover:scale-110 transform"
            title="Follow us on Instagram"
          >
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>

    </main>
  );
}
