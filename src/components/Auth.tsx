import { useState } from 'react'

export default function Auth({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/20 backdrop-blur-md">
      <div className="liquid-glass w-full max-w-md rounded-3xl p-8 relative shadow-2xl">
        <button
          onClick={onBack}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-900 transition-colors"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold tracking-tight mb-2 font-['Inter'] text-gray-900">
          {mode === 'signin' ? 'Welcome back.' : 'Begin your journey.'}
        </h2>
        <p className="text-gray-600 text-sm mb-8 font-['Barlow'] font-medium">
          {mode === 'signin'
            ? 'Sign in to access your planned escapes.'
            : 'Create an account to start saving your AI-generated itineraries.'}
        </p>

        <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onBack(); }}>
          {mode === 'signup' && (
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-gray-500 font-semibold">FULL NAME</label>
              <input
                type="text"
                required
                className="bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors shadow-inner"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-gray-500 font-semibold">EMAIL</label>
            <input
              type="email"
              required
              className="bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors shadow-inner"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest text-gray-500 font-semibold">PASSWORD</label>
            <input
              type="password"
              required
              className="bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors shadow-inner"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-gray-900 text-white rounded-xl py-3 font-semibold tracking-wide hover:bg-gray-800 transition-colors shadow-lg"
          >
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-xs tracking-widest text-gray-600 hover:text-gray-900 transition-colors uppercase font-bold"
          >
            {mode === 'signin' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  )
}
