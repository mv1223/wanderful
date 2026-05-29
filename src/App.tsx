import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Lock } from 'lucide-react'
import Auth from './components/Auth'
import Planner from './components/Planner'

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoBgRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'auth' | 'planner'>('home')

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Playback rate on video load
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handler = () => { video.playbackRate = 1.25 }
    video.addEventListener('loadedmetadata', handler)
    return () => video.removeEventListener('loadedmetadata', handler)
  }, [])

  // GSAP mouse parallax
  useEffect(() => {
    const el = videoBgRef.current
    if (!el) return

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetX = ((e.clientX - cx) / cx) * 20
      targetY = ((e.clientY - cy) / cy) * 20
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      gsap.set(el, { x: currentX, y: currentY })
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const navLinks = ['EXPLORE', 'BENEFITS', 'JOURNAL', 'GUIDEBOOK']

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Video background ── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          ref={videoBgRef}
          className={`absolute inset-[-5%] scale-[1.08] origin-center transition-all duration-1000 ${
            currentView !== 'home' ? 'blur-md brightness-50' : ''
          }`}
        >
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        {/* Subtle dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-10 py-8 flex justify-between items-center">
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}
          className="text-white no-underline"
          style={{
            fontSize: '17px',
            fontWeight: 600,
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
              className="text-white/90 hover:text-white px-4 py-1.5 rounded-full transition-colors duration-200 no-underline"
              style={{
                fontSize: '11px',
                fontWeight: 500,
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
            className="text-white/90 hover:text-white text-xs font-medium tracking-widest hidden md:block"
          >
            SIGN IN
          </button>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setCurrentView('planner'); }}
            className="liquid-glass rounded-full px-5 py-2.5 text-white/90 hover:text-white no-underline transition-colors duration-200"
            style={{
              fontSize: '11px',
              fontWeight: 500,
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
            style={{ top: '120px' }}
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
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Venture without edges.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(40px, 5.4vw, 72px)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.55)',
                  margin: 0,
                }}
              >
                Uncover with keen instinct.
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
                fontSize: '15px',
                lineHeight: 1.65,
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                margin: 0,
              }}
            >
              <span className="text-white">
                Our smart itineraries shape around you — your rhythm, your vibe, your hunger for adventure.
              </span>
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>
                {' '}Each getaway is tailored, seamless, and wholly yours.
              </span>
            </p>

            {/* CTA button */}
            <button
              onClick={() => setCurrentView('planner')}
              className="bg-white text-black rounded-full transition-all duration-200 cursor-pointer"
              style={{
                fontSize: '15px',
                fontWeight: 500,
                padding: '14px 32px',
                border: 'none',
                fontFamily: "'Barlow', sans-serif",
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'scale(1.03)'
                el.style.boxShadow = '0 0 32px 4px rgba(255,255,255,0.2)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'scale(1)'
                el.style.boxShadow = 'none'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.97)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)'
              }}
            >
              Plan my escape today
            </button>

            {/* Security badge */}
            <div className="flex items-center gap-2">
              <Lock size={13} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.7)' }} />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.7)',
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
