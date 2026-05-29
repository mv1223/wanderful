import VideoBackground from './components/VideoBackground'

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden font-['Inter',sans-serif] text-[#000000]">
      <VideoBackground />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[120px] py-[16px]">
        {/* Logo */}
        <div 
          className="font-['Schibsted_Grotesk'] font-semibold text-[24px]"
          style={{ letterSpacing: '-1.44px' }}
        >
          Logoipsum
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          {['Platform', 'Features', 'Projects', 'Community', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="flex items-center gap-1 font-['Schibsted_Grotesk'] font-medium text-[16px] hover:opacity-70 transition-opacity"
              style={{ letterSpacing: '-0.2px' }}
            >
              {link}
              {link === 'Features' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button 
            className="w-[82px] h-[40px] rounded-full font-['Schibsted_Grotesk'] font-medium text-[16px] hover:bg-black/5 transition-colors"
            style={{ letterSpacing: '-0.2px' }}
          >
            Sign Up
          </button>
          <button 
            className="w-[101px] h-[40px] bg-black text-white rounded-full font-['Schibsted_Grotesk'] font-medium text-[16px] hover:bg-black/80 transition-colors"
            style={{ letterSpacing: '-0.2px' }}
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      {/* Gap between navigation and hero is managed by padding-top or flex gap if wrapped. 
          Given exact spacing constraints: 60px gap from nav to hero. 
          Nav height approx 72px (40px button + 32px padding). 
          We center it in the screen but shift -50px. */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-[120px] -mt-[50px]">
        
        {/* Hero Header Wrapper */}
        <div className="flex flex-col items-center text-center gap-[34px]">
          
          {/* Badge */}
          <div className="flex items-center gap-3 bg-[#f8f8f8] border border-black/5 rounded-full p-1.5 pr-4 shadow-sm">
            <div className="flex items-center gap-1 bg-[#0e1311] text-white px-3 py-1 rounded-full text-xs font-semibold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              New
            </div>
            <span className="font-['Inter'] font-normal text-[14px]">
              Discover what's possible
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-['Fustat'] font-bold text-[80px] leading-none m-0"
            style={{ letterSpacing: '-4.8px' }}
          >
            Transform Data Quickly
          </h1>

          {/* Subtitle */}
          <p 
            className="font-['Fustat'] font-medium text-[20px] text-[#505050] w-[542px] max-w-[736px] m-0"
            style={{ letterSpacing: '-0.4px' }}
          >
            Upload your information and get powerful insights right away. Work smarter and achieve goals effortlessly.
          </p>
        </div>

        {/* Gap between header and search box: 44px */}
        <div className="mt-[44px] w-full max-w-[728px] h-[200px] rounded-[18px] flex flex-col justify-between p-4" 
             style={{ background: 'rgba(0,0,0,0.24)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
          
          {/* Top row */}
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-3">
              <span className="font-['Schibsted_Grotesk'] font-medium text-[12px] text-white">
                60/450 credits
              </span>
              <button 
                className="font-['Schibsted_Grotesk'] font-semibold text-[11px] text-black px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(90,225,76,0.89)' }}
              >
                Upgrade
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-white">
              {/* Sparkle icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C12 16.4772 7.52285 12 2 12C7.52285 12 12 7.52285 12 2C12 7.52285 16.4772 12 22 12C16.4772 12 12 16.4772 12 22Z" />
              </svg>
              <span className="font-['Schibsted_Grotesk'] font-medium text-[12px]">
                Powered by GPT-4o
              </span>
            </div>
          </div>

          {/* Main Input Area */}
          <div className="flex-1 bg-white rounded-[12px] shadow-sm my-3 flex items-center px-4 relative">
            <input 
              type="text" 
              placeholder="Type question..." 
              className="w-full h-full bg-transparent border-none outline-none font-['Inter'] text-[16px] text-black placeholder-[rgba(0,0,0,0.6)]"
            />
            <button className="absolute right-3 w-[36px] h-[36px] bg-black rounded-full flex items-center justify-center flex-shrink-0 hover:bg-black/80 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          </div>

          {/* Bottom row */}
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-[#f8f8f8] px-3 py-1.5 rounded-[6px] hover:bg-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
                <span className="font-['Inter'] font-medium text-[12px] text-[#505050]">Attach</span>
              </button>
              <button className="flex items-center gap-1.5 bg-[#f8f8f8] px-3 py-1.5 rounded-[6px] hover:bg-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
                <span className="font-['Inter'] font-medium text-[12px] text-[#505050]">Voice</span>
              </button>
              <button className="flex items-center gap-1.5 bg-[#f8f8f8] px-3 py-1.5 rounded-[6px] hover:bg-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span className="font-['Inter'] font-medium text-[12px] text-[#505050]">Prompts</span>
              </button>
            </div>
            
            <div className="font-['Inter'] font-normal text-[12px] text-[#505050]">
              0/3,000
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
