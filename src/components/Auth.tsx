import { useState } from 'react'

export default function Auth({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
      <div className="liquid-glass w-full max-w-md rounded-3xl p-8 relative">
        <button
          onClick={onBack}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 className="text-3xl font-light tracking-tight mb-2 font-['Inter']">
          {mode === 'signin' ? 'Welcome back.' : 'Begin your journey.'}
        </h2>
        <p className="text-white/60 text-sm mb-8 font-['Barlow']">
          {mode === 'signin'
            ? 'Sign in to access your planned escapes.'
            : 'Create an account to start saving your AI-generated itineraries.'}
        </p>

        <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onBack(); }}>
          {mode === 'signup' && (
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-white/70">FULL NAME</label>
              <input
                type="text"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-white/70">EMAIL</label>
            <input
              type="email"
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-white/70">PASSWORD</label>
            <input
              type="password"
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-white text-black rounded-xl py-3 font-medium tracking-wide hover:bg-white/90 transition-colors"
          >
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-xs tracking-widest text-white/50 hover:text-white transition-colors uppercase"
          >
            {mode === 'signin' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  )
}
