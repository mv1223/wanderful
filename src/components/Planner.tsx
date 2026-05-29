import { useState } from 'react'

export default function Planner({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input')
  const [location, setLocation] = useState('')

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!location) return
    setStep('generating')
    setTimeout(() => setStep('result'), 3000)
  }

  return (
    <div className="fixed inset-0 z-40 pt-28 px-6 pb-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
      <button
        onClick={onBack}
        className="fixed top-32 right-10 text-white/50 hover:text-white transition-colors z-50 text-sm tracking-widest uppercase"
      >
        ← Back to Home
      </button>

      <div className="max-w-4xl mx-auto mt-10">
        {step === 'input' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 font-['Inter']">
              Design your escape.
            </h1>
            <p className="text-white/60 text-lg mb-12 font-['Barlow'] max-w-xl">
              Tell our AI where you want to go and what vibe you're chasing. We'll craft a perfect, seamless itinerary just for you.
            </p>

            <form onSubmit={handleGenerate} className="liquid-glass p-8 rounded-3xl flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-white/70">DESTINATION</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="e.g. Tokyo, Japan"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-white/70">DATES</label>
                  <input
                    type="text"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Oct 12 - Oct 18"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-white/70">TRAVEL VIBE</label>
                <input
                  type="text"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="e.g. relaxing, adventurous, food-focused..."
                />
              </div>

              <button
                type="submit"
                className="mt-4 bg-white text-black rounded-xl py-4 font-medium tracking-wide hover:bg-white/90 transition-colors text-lg"
              >
                Generate Itinerary
              </button>
            </form>
          </div>
        )}

        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center h-[50vh] animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-8"></div>
            <h2 className="text-2xl font-light font-['Inter'] animate-pulse">
              Curating your {location} experience...
            </h2>
            <p className="text-white/50 mt-2 text-sm tracking-widest uppercase">
              Searching for hidden gems
            </p>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            <div className="mb-12 flex justify-between items-end border-b border-white/10 pb-8">
              <div>
                <p className="text-sm tracking-widest text-white/50 mb-2">YOUR ITINERARY</p>
                <h1 className="text-5xl font-light tracking-tight font-['Inter']">{location}</h1>
              </div>
              <button className="liquid-glass px-6 py-2 rounded-full text-sm font-medium tracking-widest hover:bg-white/10 transition-colors">
                SAVE PLAN
              </button>
            </div>

            <div className="space-y-8">
              {[1, 2, 3].map((day) => (
                <div key={day} className="liquid-glass p-8 rounded-3xl">
                  <h3 className="text-xl font-medium mb-6 font-['Inter']">Day {day}</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-16 text-sm text-white/50 pt-1">09:00</div>
                      <div className="flex-1 border-l border-white/10 pl-6">
                        <h4 className="text-lg font-medium mb-1">Morning Discovery</h4>
                        <p className="text-white/70 text-sm">Start your day with a curated local coffee experience, followed by a private guided walk through the historic district.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-16 text-sm text-white/50 pt-1">13:30</div>
                      <div className="flex-1 border-l border-white/10 pl-6">
                        <h4 className="text-lg font-medium mb-1">Culinary Journey</h4>
                        <p className="text-white/70 text-sm">Lunch reservations at a highly-rated, hidden gem restaurant known only to locals.</p>
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
          </div>
        )}
      </div>
    </div>
  )
}
