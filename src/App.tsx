import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import Auth from './components/Auth'
import Planner from './components/Planner'

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'auth' | 'planner'>('home')

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const navLinks = ['EXPLORE', 'BENEFITS', 'JOURNAL', 'GUIDEBOOK']

  return (
    <div
      className="min-h-screen vibrant-bg text-gray-900 overflow-x-hidden relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-10 py-8 flex justify-between items-center">
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}
          className="text-gray-900 no-underline"
          style={{
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          Wanderful<sup className="text-[10px] align-super ml-0.5 opacity-70">TM</sup>
        </a>

        {/* Nav */}
        <nav className="liquid-glass rounded-full px-2 py-2 flex items-center gap-1 hidden md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (link === 'EXPLORE') setCurrentView('planner');
              }}
              className="text-gray-700 hover:text-gray-900 hover:bg-white/30 px-4 py-1.5 rounded-full transition-colors duration-200 no-underline"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                fontFamily: "'Barlow', sans-serif",
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Auth & CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('auth')}
            className="text-gray-800 hover:text-gray-900 text-xs font-semibold tracking-widest hidden md:block"
          >
            SIGN IN
          </button>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setCurrentView('planner'); }}
            className="liquid-glass rounded-full px-5 py-2.5 text-gray-800 hover:text-gray-900 font-semibold no-underline transition-colors duration-200"
            style={{
              fontSize: '11px',
              letterSpacing: '0.12em',
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            GET ROAMING
          </a>
        </div>
      </header>

      {/* Views */}
      {currentView === 'home' && (
        <>
          {/* ── Hero headline ── */}
          <div
            className="fixed left-0 right-0 z-20 flex flex-col items-center text-center px-6"
            style={{ top: '160px' }}
          >
            <div
              className={`transition-all duration-1000 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(40px, 5.4vw, 72px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#1a202c',
                  margin: 0,
                  textShadow: '0 4px 20px rgba(255,255,255,0.4)'
                }}
              >
                Venture without edges.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(40px, 5.4vw, 72px)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: 'rgba(26, 32, 44, 0.6)',
                  margin: 0,
                }}
              >
                Uncover India's best.
              </p>
            </div>
          </div>

          {/* ── Bottom block ── */}
          <div
            className={`fixed bottom-14 left-0 right-0 z-20 flex flex-col items-center gap-6 px-6 transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Descriptor paragraph */}
            <p
              className="text-center"
              style={{
                maxWidth: '620px',
                fontSize: '16px',
                lineHeight: 1.65,
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                color: '#2d3748',
                margin: 0,
              }}
            >
              Our smart itineraries shape around you — your rhythm, your budget, your hunger for adventure. Each getaway is tailored, seamless, and wholly yours.
            </p>

            {/* CTA button */}
            <button
              onClick={() => setCurrentView('planner')}
              className="bg-gray-900 text-white rounded-full transition-all duration-200 cursor-pointer shadow-xl hover:shadow-2xl"
              style={{
                fontSize: '15px',
                fontWeight: 600,
                padding: '16px 36px',
                border: 'none',
                fontFamily: "'Barlow', sans-serif",
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'scale(1)'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
            >
              Plan my escape today
            </button>

            {/* Security badge */}
            <div className="flex items-center gap-2 mt-4">
              <Lock size={13} strokeWidth={2} className="text-gray-600" />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  color: '#4a5568',
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                SECURE BY DESIGN. ZERO DATA LEAKS.
              </span>
            </div>
          </div>
        </>
      )}

      {currentView === 'auth' && <Auth onBack={() => setCurrentView('home')} />}
      {currentView === 'planner' && <Planner onBack={() => setCurrentView('home')} />}
    </div>
  )
}
