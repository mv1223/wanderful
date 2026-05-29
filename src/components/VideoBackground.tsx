import { useEffect, useRef } from 'react'

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeRafRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Helper to run fade animation
    const runFade = (targetOpacity: number, durationMs: number = 250) => {
      if (fadeRafRef.current) {
        cancelAnimationFrame(fadeRafRef.current)
      }
      
      const startOpacity = parseFloat(video.style.opacity || '0')
      const startTime = performance.now()
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / durationMs, 1)
        
        // Linear interpolation from startOpacity to targetOpacity
        const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress
        video.style.opacity = currentOpacity.toString()
        
        if (progress < 1) {
          fadeRafRef.current = requestAnimationFrame(animate)
        }
      }
      
      fadeRafRef.current = requestAnimationFrame(animate)
    }

    // On Load/Loop start
    const handleLoadedData = () => {
      runFade(1, 250)
    }

    // Time update to trigger fade-out
    const handleTimeUpdate = () => {
      if (!video.duration) return
      const timeLeft = video.duration - video.currentTime
      if (timeLeft <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        runFade(0, 250)
      }
    }

    // On video end
    const handleEnded = () => {
      // Ensure opacity is strictly 0
      if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current)
      video.style.opacity = '0'
      
      setTimeout(() => {
        fadingOutRef.current = false
        video.currentTime = 0
        video.play().then(() => {
          runFade(1, 250)
        }).catch(err => console.error("Video play failed:", err))
      }, 100)
    }

    // Setup initial state
    video.style.opacity = '0'
    
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    // Trigger initial load if already ready
    if (video.readyState >= 3) {
      handleLoadedData()
    }

    return () => {
      if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#f8f8f8]">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4"
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[115%] h-[115%] object-cover"
        style={{ objectPosition: 'top center' }}
      />
    </div>
  )
}
