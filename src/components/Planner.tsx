import { useState } from 'react'

export default function Planner({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input')
  const [stateName, setStateName] = useState('')
  const [place, setPlace] = useState('')
  const [budget, setBudget] = useState('')
  const [days, setDays] = useState('')
  const [locationName, setLocationName] = useState('')

  // India-only exhaustive dataset (All States and UTs)
  const locationsData: Record<string, string[]> = {
    'Andhra Pradesh': ['Vizag', 'Araku Valley', 'Vijayawada', 'Tirupati', 'Amaravati'],
    'Arunachal Pradesh': ['Tawang', 'Itanagar', 'Ziro', 'Roing'],
    'Assam': ['Guwahati', 'Kaziranga', 'Majuli', 'Silchar'],
    'Bihar': ['Patna', 'Bodh Gaya', 'Nalanda', 'Rajgir'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Jagdalpur', 'Bilaspur'],
    'Goa': ['North Goa', 'South Goa', 'Panaji', 'Vasco da Gama'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Gir', 'Kutch', 'Dwarka'],
    'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Kurukshetra'],
    'Himachal Pradesh': ['Manali', 'Shimla', 'Dharamshala', 'Kasol', 'Dalhousie'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Deoghar', 'Dhanbad'],
    'Karnataka': ['Bengaluru', 'Coorg', 'Mysuru', 'Gokarna', 'Hampi'],
    'Kerala': ['Munnar', 'Alleppey', 'Wayanad', 'Kochi', 'Thiruvananthapuram'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Khajuraho', 'Ujjain'],
    'Maharashtra': ['Mumbai', 'Pune', 'Lonavala', 'Mahabaleshwar', 'Nashik'],
    'Manipur': ['Imphal', 'Loktak Lake', 'Ukhrul'],
    'Meghalaya': ['Shillong', 'Cherrapunji', 'Dawki'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Champhai'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
    'Odisha': ['Bhubaneswar', 'Puri', 'Konark', 'Cuttack'],
    'Punjab': ['Amritsar', 'Chandigarh', 'Ludhiana', 'Jalandhar'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jaisalmer', 'Jodhpur', 'Pushkar'],
    'Sikkim': ['Gangtok', 'Pelling', 'Lachung', 'Namchi'],
    'Tamil Nadu': ['Chennai', 'Ooty', 'Kodaikanal', 'Madurai', 'Coimbatore'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
    'Tripura': ['Agartala', 'Udaipur (Tripura)', 'Unakoti'],
    'Uttar Pradesh': ['Varanasi', 'Agra', 'Lucknow', 'Mathura', 'Ayodhya'],
    'Uttarakhand': ['Rishikesh', 'Mussoorie', 'Nainital', 'Dehradun', 'Haridwar'],
    'West Bengal': ['Kolkata', 'Darjeeling', 'Siliguri', 'Sundarbans'],
    'Andaman and Nicobar Islands': ['Port Blair', 'Havelock Island', 'Neil Island'],
    'Chandigarh': ['Chandigarh City'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
    'Delhi': ['New Delhi', 'Old Delhi', 'South Delhi'],
    'Jammu and Kashmir': ['Srinagar', 'Gulmarg', 'Pahalgam', 'Jammu'],
    'Ladakh': ['Leh', 'Pangong Tso', 'Nubra Valley'],
    'Lakshadweep': ['Agatti', 'Bangaram', 'Kavaratti'],
    'Puducherry': ['Pondicherry', 'Auroville']
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!stateName || !place) return
    setLocationName(`${place}, ${stateName}`)
    setStep('generating')
    setTimeout(() => setStep('result'), 3500)
  }

  return (
    <div className="fixed inset-0 z-40 pt-28 px-6 pb-6 overflow-y-auto bg-white/30 backdrop-blur-xl">
      <button
        onClick={onBack}
        className="fixed top-32 right-10 text-gray-500 hover:text-gray-900 transition-colors z-50 text-sm tracking-widest uppercase font-bold"
      >
        ← Back to Home
      </button>

      <div className="max-w-5xl mx-auto mt-10">
        {step === 'input' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 font-['Inter'] text-gray-900">
              Design your escape.
            </h1>
            <p className="text-gray-700 text-lg mb-12 font-['Barlow'] max-w-2xl font-medium">
              Tell our AI your budget, trip duration, and destination. We analyze live data to craft a perfect, seamless itinerary for the best places in India.
            </p>

            <form onSubmit={handleGenerate} className="liquid-glass p-8 rounded-3xl flex flex-col gap-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-gray-600 font-bold">STATE</label>
                  <select
                    required
                    value={stateName}
                    onChange={(e) => { setStateName(e.target.value); setPlace(''); }}
                    className="bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors shadow-inner"
                  >
                    <option value="" disabled>Select State...</option>
                    {Object.keys(locationsData).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-gray-600 font-bold">PLACE</label>
                  <select
                    required
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    disabled={!stateName}
                    className="bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors disabled:opacity-50 shadow-inner"
                  >
                    <option value="" disabled>Select Place...</option>
                    {stateName && locationsData[stateName].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-gray-600 font-bold">BUDGET</label>
                  <select
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors shadow-inner"
                  >
                    <option value="" disabled>Select Budget...</option>
                    <option value="economy">Economy ($)</option>
                    <option value="premium">Premium ($$)</option>
                    <option value="high class">High Class ($$$)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-gray-600 font-bold">NUMBER OF DAYS</label>
                  <select
                    required
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors shadow-inner"
                  >
                    <option value="" disabled>Trip duration...</option>
                    <option value="2">2 Days (Weekend Getaway)</option>
                    <option value="3">3 Days (Short Trip)</option>
                    <option value="5">5 Days (Standard Trip)</option>
                    <option value="7">7 Days (Full Week Experience)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 bg-gray-900 text-white rounded-xl py-4 font-bold tracking-wide hover:bg-gray-800 transition-colors text-lg shadow-lg"
              >
                Generate Smart Itinerary
              </button>
            </form>
          </div>
        )}

        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center h-[50vh] animate-in fade-in zoom-in duration-500 text-gray-900">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-8"></div>
            <h2 className="text-2xl font-bold font-['Inter'] animate-pulse text-center">
              Curating your {budget} experience in {locationName}...
            </h2>
            <p className="text-gray-600 mt-2 text-sm tracking-widest uppercase font-bold text-center">
              Planning for {days} days of adventure
            </p>
          </div>
        )}

        {step === 'result' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            <div className="mb-12 flex justify-between items-end border-b border-gray-300 pb-8">
              <div>
                <p className="text-sm tracking-widest text-gray-500 mb-2 font-bold">YOUR AI ITINERARY</p>
                <h1 className="text-5xl font-bold tracking-tight font-['Inter'] mb-2 text-gray-900">{locationName}</h1>
                <div className="flex gap-3 text-sm text-gray-700 font-bold">
                  <span className="liquid-glass px-3 py-1 rounded-full border-gray-400">{budget.toUpperCase()}</span>
                  <span className="liquid-glass px-3 py-1 rounded-full border-gray-400">{days} DAYS</span>
                </div>
              </div>
              <button className="liquid-glass px-6 py-2 rounded-full text-sm font-bold tracking-widest hover:bg-white/50 transition-colors text-gray-900 border-gray-400">
                SAVE PLAN
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Itinerary Column */}
              <div className="lg:col-span-2 space-y-8">
                {Array.from({ length: parseInt(days || '3') }).map((_, i) => (
                  <div key={i} className="liquid-glass p-8 rounded-3xl shadow-xl">
                    <h3 className="text-xl font-bold mb-6 font-['Inter'] text-gray-900">Day {i + 1}</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-16 text-sm text-gray-500 font-bold pt-1">09:00</div>
                        <div className="flex-1 border-l-2 border-gray-300 pl-6">
                          <h4 className="text-lg font-bold mb-1 text-gray-900">Morning Discovery</h4>
                          <p className="text-gray-700 text-sm font-medium">Start your day with a curated local experience optimized for your {budget} budget, followed by a guided tour.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-16 text-sm text-gray-500 font-bold pt-1">13:30</div>
                        <div className="flex-1 border-l-2 border-gray-300 pl-6">
                          <h4 className="text-lg font-bold mb-1 text-gray-900">Culinary Journey</h4>
                          <p className="text-gray-700 text-sm font-medium">Lunch reservations at a highly-rated restaurant showcasing authentic {stateName} cuisine.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-16 text-sm text-gray-500 font-bold pt-1">17:00</div>
                        <div className="flex-1 border-l-2 border-gray-300 pl-6">
                          <h4 className="text-lg font-bold mb-1 text-gray-900">Sunset Views</h4>
                          <p className="text-gray-700 text-sm font-medium">Exclusive access to a scenic viewpoint to watch the sunset, complete with customized recommendations for evening drinks.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Column */}
              <div className="lg:col-span-1 h-full">
                <div className="liquid-glass rounded-3xl h-[400px] lg:h-full sticky top-32 overflow-hidden flex flex-col shadow-xl">
                  <div className="p-4 border-b border-gray-300">
                    <p className="text-xs tracking-widest text-gray-500 font-bold">LOCATION MAP</p>
                  </div>
                  <div className="flex-1 relative group bg-white">
                    {/* Vibrant map styling mock */}
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=India&zoom=5&size=600x800&style=feature:water|element:geometry|color:0xcbe6a3&style=feature:landscape|element:geometry|color:0xfafafa')] bg-cover bg-center opacity-80" />
                    
                    {/* Pin and label */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-6 h-6 bg-red-500 rounded-full shadow-[0_0_20px_5px_rgba(239,68,68,0.6)] animate-bounce border-2 border-white" />
                      <div className="mt-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200 text-xs font-bold tracking-wider text-gray-900 shadow-lg">
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
