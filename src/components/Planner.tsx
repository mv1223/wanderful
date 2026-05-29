import { useState } from 'react'

export default function Planner({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [budget, setBudget] = useState('')
  const [season, setSeason] = useState('')
  const [locationName, setLocationName] = useState('')

  // Mocked "live dataset" for cascading dropdowns
  const locationsData: Record<string, string[]> = {
    'United States': ['California', 'New York', 'Hawaii', 'Colorado'],
    'Japan': ['Tokyo Prefecture', 'Kyoto Prefecture', 'Hokkaido', 'Osaka'],
    'Italy': ['Tuscany', 'Lombardy', 'Sicily', 'Campania'],
    'India': ['Kerala', 'Rajasthan', 'Goa', 'Himachal Pradesh'],
    'France': ['Île-de-France', 'Provence', 'Normandy', 'Brittany'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Tasmania']
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!country || !state) return
    setLocationName(`${state}, ${country}`)
    setStep('generating')
    setTimeout(() => setStep('result'), 3500)
  }

  return (
    <div className="fixed inset-0 z-40 pt-28 px-6 pb-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
      <button
        onClick={onBack}
        className="fixed top-32 right-10 text-white/50 hover:text-white transition-colors z-50 text-sm tracking-widest uppercase"
      >
        ← Back to Home
      </button>

      <div className="max-w-5xl mx-auto mt-10">
        {step === 'input' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 font-['Inter']">
              Design your escape.
            </h1>
            <p className="text-white/60 text-lg mb-12 font-['Barlow'] max-w-2xl">
              Tell our AI your budget, preferred season, and destination. We analyze live data to craft a perfect, seamless itinerary that matches the best time to visit.
            </p>

            <form onSubmit={handleGenerate} className="liquid-glass p-8 rounded-3xl flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-white/70">COUNTRY</label>
                  <select
                    required
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); setState(''); }}
                    className="bg-[#0a0a0a]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  >
                    <option value="" disabled className="bg-black text-white/50">Select Country...</option>
                    {Object.keys(locationsData).map(c => (
                      <option key={c} value={c} className="bg-black text-white">{c}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-white/70">STATE / REGION</label>
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={!country}
                    className="bg-[#0a0a0a]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
                  >
                    <option value="" disabled className="bg-black text-white/50">Select State...</option>
                    {country && locationsData[country].map(s => (
                      <option key={s} value={s} className="bg-black text-white">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-white/70">BUDGET</label>
                  <select
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="bg-[#0a0a0a]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  >
                    <option value="" disabled className="bg-black text-white/50">Select Budget...</option>
                    <option value="economy" className="bg-black text-white">Economy ($)</option>
                    <option value="standard" className="bg-black text-white">Standard ($$)</option>
                    <option value="luxury" className="bg-black text-white">Luxury ($$$)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-white/70">SEASON TO VISIT</label>
                  <select
                    required
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="bg-[#0a0a0a]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  >
                    <option value="" disabled className="bg-black text-white/50">Best time to visit...</option>
                    <option value="spring" className="bg-black text-white">Spring (Blooming & Mild)</option>
                    <option value="summer" className="bg-black text-white">Summer (Warm & Vibrant)</option>
                    <option value="autumn" className="bg-black text-white">Autumn (Crisp & Colorful)</option>
                    <option value="winter" className="bg-black text-white">Winter (Snow & Festive)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 bg-white text-black rounded-xl py-4 font-medium tracking-wide hover:bg-white/90 transition-colors text-lg"
              >
                Generate Smart Itinerary
              </button>
            </form>
          </div>
        )}

        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center h-[50vh] animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-8"></div>
            <h2 className="text-2xl font-light font-['Inter'] animate-pulse">
              Curating your {budget} {season} experience in {locationName}...
            </h2>
            <p className="text-white/50 mt-2 text-sm tracking-widest uppercase">
              Cross-referencing live seasonal data...
            </p>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            <div className="mb-12 flex justify-between items-end border-b border-white/10 pb-8">
              <div>
                <p className="text-sm tracking-widest text-white/50 mb-2">YOUR AI ITINERARY</p>
                <h1 className="text-5xl font-light tracking-tight font-['Inter'] mb-2">{locationName}</h1>
                <div className="flex gap-3 text-sm text-white/70">
                  <span className="liquid-glass px-3 py-1 rounded-full">{budget.toUpperCase()}</span>
                  <span className="liquid-glass px-3 py-1 rounded-full">{season.toUpperCase()}</span>
                </div>
              </div>
              <button className="liquid-glass px-6 py-2 rounded-full text-sm font-medium tracking-widest hover:bg-white/10 transition-colors">
                SAVE PLAN
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Itinerary Column */}
              <div className="lg:col-span-2 space-y-8">
                {[1, 2, 3].map((day) => (
                  <div key={day} className="liquid-glass p-8 rounded-3xl">
                    <h3 className="text-xl font-medium mb-6 font-['Inter']">Day {day}</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-16 text-sm text-white/50 pt-1">09:00</div>
                        <div className="flex-1 border-l border-white/10 pl-6">
                          <h4 className="text-lg font-medium mb-1">Morning Discovery</h4>
                          <p className="text-white/70 text-sm">Start your day with a curated local experience optimized for {season} weather, followed by a private guided walk.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-16 text-sm text-white/50 pt-1">13:30</div>
                        <div className="flex-1 border-l border-white/10 pl-6">
                          <h4 className="text-lg font-medium mb-1">Culinary Journey</h4>
                          <p className="text-white/70 text-sm">Lunch reservations at a highly-rated, hidden gem restaurant fitting your {budget} budget.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-16 text-sm text-white/50 pt-1">17:00</div>
                        <div className="flex-1 border-l border-white/10 pl-6">
                          <h4 className="text-lg font-medium mb-1">Sunset Views</h4>
                          <p className="text-white/70 text-sm">Exclusive access to a scenic viewpoint to watch the sunset, complete with customized recommendations for evening drinks.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Column */}
              <div className="lg:col-span-1 h-full">
                <div className="liquid-glass rounded-3xl h-[400px] lg:h-full sticky top-32 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-white/10">
                    <p className="text-xs tracking-widest text-white/50">LOCATION MAP</p>
                  </div>
                  <div className="flex-1 bg-[#1a1a1a] relative group">
                    {/* Dark mode Google Maps styling mock */}
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=1&size=600x800&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646')] bg-cover bg-center opacity-40 mix-blend-luminosity filter grayscale contrast-125" />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Pin and label */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.5)] animate-pulse" />
                      <div className="mt-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium tracking-wider">
                        {locationName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
