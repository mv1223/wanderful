import { useState } from 'react'
import VideoBackground from './components/VideoBackground'
import Auth from './components/Auth'

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'auth'>('home')
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input')
  
  const [stateName, setStateName] = useState('')
  const [place, setPlace] = useState('')
  const [budget, setBudget] = useState('')
  const [days, setDays] = useState('')
  const [locationName, setLocationName] = useState('')

  // India-only exhaustive dataset
  const locationsData: Record<string, string[]> = {
    'Andhra Pradesh': ['Vizag', 'Araku Valley', 'Vijayawada', 'Tirupati', 'Amaravati'],
    'Arunachal Pradesh': ['Tawang', 'Itanagar', 'Ziro', 'Roing'],
    'Assam': ['Guwahati', 'Kaziranga', 'Majuli', 'Silchar'],
    'Bihar': ['Patna', 'Bodh Gaya', 'Nalanda', 'Rajgir'],
    'Goa': ['North Goa', 'South Goa', 'Panaji', 'Vasco da Gama'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Gir', 'Kutch', 'Dwarka'],
    'Himachal Pradesh': ['Manali', 'Shimla', 'Dharamshala', 'Kasol', 'Dalhousie'],
    'Karnataka': ['Bengaluru', 'Coorg', 'Mysuru', 'Gokarna', 'Hampi'],
    'Kerala': ['Munnar', 'Alleppey', 'Wayanad', 'Kochi', 'Thiruvananthapuram'],
    'Maharashtra': ['Mumbai', 'Pune', 'Lonavala', 'Mahabaleshwar', 'Nashik'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur', 'Pushkar'],
    'Tamil Nadu': ['Chennai', 'Ooty', 'Kodaikanal', 'Madurai', 'Coimbatore'],
    'Uttarakhand': ['Rishikesh', 'Mussoorie', 'Nainital', 'Dehradun', 'Haridwar'],
    'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Sundarbans'],
    'Delhi': ['New Delhi', 'Old Delhi', 'South Delhi'],
    'Jammu and Kashmir': ['Srinagar', 'Gulmarg', 'Pahalgam', 'Jammu'],
    'Ladakh': ['Leh', 'Pangong Tso', 'Nubra Valley'],
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!stateName || !place || !budget || !days) return
    setLocationName(`${place}, ${stateName}`)
    setStep('generating')
    setTimeout(() => setStep('result'), 3500)
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden font-['Inter',sans-serif] text-[#000000]">
      <VideoBackground />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-[120px] py-[16px]">
        {/* Logo */}
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); setStep('input'); setCurrentView('home'); }}
          className="font-['Schibsted_Grotesk'] font-bold text-[24px] cursor-pointer"
          style={{ letterSpacing: '-1.44px' }}
        >
          Wanderful
        </a>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8">
          {['Explore', 'Benefits', 'Journal', 'Guidebook'].map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => { e.preventDefault(); setStep('input'); }}
              className="flex items-center gap-1 font-['Schibsted_Grotesk'] font-medium text-[16px] hover:opacity-70 transition-opacity"
              style={{ letterSpacing: '-0.2px' }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('auth')}
            className="w-[82px] h-[40px] rounded-full font-['Schibsted_Grotesk'] font-medium text-[16px] hover:bg-black/5 transition-colors"
            style={{ letterSpacing: '-0.2px' }}
          >
            Sign In
          </button>
          <button 
            onClick={() => setStep('input')}
            className="hidden sm:block w-[101px] h-[40px] bg-black text-white rounded-full font-['Schibsted_Grotesk'] font-medium text-[16px] hover:bg-black/80 transition-colors shadow-lg"
            style={{ letterSpacing: '-0.2px' }}
          >
            Plan Trip
          </button>
        </div>
      </nav>

      {currentView === 'home' && (
        <main className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 lg:px-[120px] ${step === 'input' ? '-mt-[50px]' : 'mt-24 pb-20'}`}>
          
          {step === 'input' && (
            <div className="flex flex-col items-center w-full animate-in fade-in duration-1000">
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
                    Discover India's best
                  </span>
                </div>

                {/* Headline */}
                <h1 
                  className="font-['Fustat'] font-bold text-5xl md:text-[80px] leading-none m-0"
                  style={{ letterSpacing: '-4.8px' }}
                >
                  Design your escape.
                </h1>

                {/* Subtitle */}
                <p 
                  className="font-['Fustat'] font-medium text-[20px] text-[#505050] w-full sm:w-[542px] max-w-[736px] m-0 px-4"
                  style={{ letterSpacing: '-0.4px' }}
                >
                  Tell our AI your budget, trip duration, and destination. We analyze live data to craft a perfect, seamless itinerary right away.
                </p>
              </div>

              {/* Glassmorphic Planner Box */}
              <form onSubmit={handleGenerate} className="mt-[44px] w-full max-w-[728px] h-auto min-h-[200px] rounded-[18px] flex flex-col justify-between p-4 shadow-2xl" 
                   style={{ background: 'rgba(0,0,0,0.24)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                
                {/* Top row */}
                <div className="flex justify-between items-center px-1 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-['Schibsted_Grotesk'] font-medium text-[12px] text-white">
                      Wanderful AI Planner
                    </span>
                    <div 
                      className="font-['Schibsted_Grotesk'] font-semibold text-[11px] text-black px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(90,225,76,0.89)' }}
                    >
                      Unlimited
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22C12 16.4772 7.52285 12 2 12C7.52285 12 12 7.52285 12 2C12 7.52285 16.4772 12 22 12C16.4772 12 12 16.4772 12 22Z" />
                    </svg>
                    <span className="font-['Schibsted_Grotesk'] font-medium text-[12px]">
                      Powered by GPT-4o
                    </span>
                  </div>
                </div>

                {/* Main Input Area - 4 Dropdowns */}
                <div className="flex-1 bg-white rounded-[12px] shadow-sm my-3 p-4 relative flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select required value={stateName} onChange={(e) => { setStateName(e.target.value); setPlace(''); }} className="bg-[#f8f8f8] border border-gray-200 rounded-lg px-4 py-3 font-['Inter'] text-[15px] text-black focus:outline-none focus:ring-1 focus:ring-black">
                      <option value="" disabled>Select State...</option>
                      {Object.keys(locationsData).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    
                    <select required value={place} onChange={(e) => setPlace(e.target.value)} disabled={!stateName} className="bg-[#f8f8f8] border border-gray-200 rounded-lg px-4 py-3 font-['Inter'] text-[15px] text-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50">
                      <option value="" disabled>Select Place...</option>
                      {stateName && locationsData[stateName].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>

                    <select required value={budget} onChange={(e) => setBudget(e.target.value)} className="bg-[#f8f8f8] border border-gray-200 rounded-lg px-4 py-3 font-['Inter'] text-[15px] text-black focus:outline-none focus:ring-1 focus:ring-black">
                      <option value="" disabled>Select Budget...</option>
                      <option value="economy">Economy ($)</option>
                      <option value="premium">Premium ($$)</option>
                      <option value="high class">High Class ($$$)</option>
                    </select>

                    <select required value={days} onChange={(e) => setDays(e.target.value)} className="bg-[#f8f8f8] border border-gray-200 rounded-lg px-4 py-3 font-['Inter'] text-[15px] text-black focus:outline-none focus:ring-1 focus:ring-black">
                      <option value="" disabled>Trip duration...</option>
                      <option value="2">2 Days (Weekend)</option>
                      <option value="3">3 Days (Short)</option>
                      <option value="5">5 Days (Standard)</option>
                      <option value="7">7 Days (Full Week)</option>
                    </select>
                  </div>

                  <button type="submit" className="absolute -bottom-5 right-6 w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center flex-shrink-0 hover:bg-black/80 transition-transform hover:scale-105 shadow-xl border-4 border-[rgba(0,0,0,0.24)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Bottom row */}
                <div className="flex justify-between items-center px-1 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-[#f8f8f8]/90 px-3 py-1.5 rounded-[6px]">
                      <span className="font-['Inter'] font-medium text-[12px] text-[#505050]">Live Data Maps</span>
                    </div>
                  </div>
                  <div className="font-['Inter'] font-normal text-[12px] text-white">
                    India Exclusive
                  </div>
                </div>
              </form>
            </div>
          )}

          {step === 'generating' && (
            <div className="flex flex-col items-center justify-center h-[50vh] animate-in fade-in zoom-in duration-500 w-full max-w-3xl">
              <div className="w-16 h-16 border-4 border-white/30 border-t-black rounded-full animate-spin mb-8 shadow-xl"></div>
              <h2 className="text-4xl font-['Fustat'] font-bold animate-pulse text-center" style={{ letterSpacing: '-1.5px' }}>
                Curating your {budget} experience in {locationName}...
              </h2>
              <p className="font-['Schibsted_Grotesk'] font-semibold mt-4 text-sm tracking-widest uppercase text-[#505050] text-center bg-white/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                Planning for {days} days of adventure
              </p>
            </div>
          )}

          {step === 'result' && (
            <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-white/40 backdrop-blur-2xl p-8 md:p-12 rounded-[32px] border border-white/60 shadow-2xl">
              <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end border-b border-black/10 pb-8 gap-4">
                <div>
                  <p className="font-['Schibsted_Grotesk'] text-[13px] tracking-widest text-[#505050] mb-2 font-bold uppercase">Your AI Itinerary</p>
                  <h1 className="font-['Fustat'] text-5xl md:text-[64px] font-bold leading-none mb-4" style={{ letterSpacing: '-2.5px' }}>{locationName}</h1>
                  <div className="flex gap-3 font-['Inter'] text-[13px] font-semibold text-black">
                    <span className="bg-white/60 px-4 py-1.5 rounded-full border border-white/40 shadow-sm">{budget.toUpperCase()}</span>
                    <span className="bg-white/60 px-4 py-1.5 rounded-full border border-white/40 shadow-sm">{days} DAYS</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep('input')}
                  className="bg-black text-white px-6 py-3 rounded-full font-['Schibsted_Grotesk'] font-medium text-[15px] hover:bg-black/80 transition-colors shadow-lg whitespace-nowrap"
                >
                  Start New Plan
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Itinerary Column */}
                <div className="lg:col-span-2 space-y-8">
                  {Array.from({ length: parseInt(days || '3') }).map((_, i) => (
                    <div key={i} className="bg-white/60 border border-white/50 p-8 rounded-[24px] shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-['Fustat'] text-[28px] font-bold mb-6 text-black" style={{ letterSpacing: '-1px' }}>Day {i + 1}</h3>
                      <div className="space-y-8">
                        <div className="flex gap-6">
                          <div className="w-16 font-['Schibsted_Grotesk'] text-[14px] text-[#505050] font-bold pt-1 border-r border-black/10 pr-4 text-right">09:00</div>
                          <div className="flex-1">
                            <h4 className="font-['Inter'] text-[18px] font-bold mb-1.5 text-black">Morning Discovery</h4>
                            <p className="font-['Inter'] text-[#505050] text-[15px] leading-relaxed">Start your day with a curated local experience optimized for your {budget} budget, followed by a guided tour.</p>
                          </div>
                        </div>
                        <div className="flex gap-6">
                          <div className="w-16 font-['Schibsted_Grotesk'] text-[14px] text-[#505050] font-bold pt-1 border-r border-black/10 pr-4 text-right">13:30</div>
                          <div className="flex-1">
                            <h4 className="font-['Inter'] text-[18px] font-bold mb-1.5 text-black">Culinary Journey</h4>
                            <p className="font-['Inter'] text-[#505050] text-[15px] leading-relaxed">Lunch reservations at a highly-rated restaurant showcasing authentic {stateName} cuisine.</p>
                          </div>
                        </div>
                        <div className="flex gap-6">
                          <div className="w-16 font-['Schibsted_Grotesk'] text-[14px] text-[#505050] font-bold pt-1 border-r border-black/10 pr-4 text-right">17:00</div>
                          <div className="flex-1">
                            <h4 className="font-['Inter'] text-[18px] font-bold mb-1.5 text-black">Sunset Views</h4>
                            <p className="font-['Inter'] text-[#505050] text-[15px] leading-relaxed">Exclusive access to a scenic viewpoint to watch the sunset, complete with customized recommendations for evening drinks.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Column */}
                <div className="lg:col-span-1">
                  <div className="bg-white/60 border border-white/50 rounded-[24px] h-[400px] lg:h-[600px] sticky top-32 overflow-hidden flex flex-col shadow-sm">
                    <div className="p-5 border-b border-black/10 bg-white/30 backdrop-blur-md z-10">
                      <p className="font-['Schibsted_Grotesk'] text-[12px] tracking-widest text-[#505050] font-bold uppercase">Location Map</p>
                    </div>
                    <div className="flex-1 relative group bg-white">
                      {/* Vibrant map styling mock */}
                      <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=India&zoom=5&size=600x800&style=feature:water|element:geometry|color:0xcbe6a3&style=feature:landscape|element:geometry|color:0xfafafa')] bg-cover bg-center opacity-90 transition-transform duration-700 group-hover:scale-105" />
                      
                      {/* Pin and label */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="w-8 h-8 bg-black rounded-full shadow-[0_0_25px_5px_rgba(0,0,0,0.4)] animate-bounce border-[3px] border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="mt-3 bg-black/90 backdrop-blur-md px-5 py-2 rounded-full text-[13px] font-bold tracking-wide text-white shadow-xl">
                          {locationName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {currentView === 'auth' && <Auth onBack={() => setCurrentView('home')} />}
    </div>
  )
}
