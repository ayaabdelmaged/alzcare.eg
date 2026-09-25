import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ===== ICONS =====
const HeartIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const HeartPulseIcon = () => (
  <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>
  </svg>
);

const UsersIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const UserIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const StethoscopeIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>
);

const HomeIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const MessageCircleIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const HandshakeIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
    <path d="m21 3 1 11h-2"/>
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
    <path d="M3 4h8"/>
  </svg>
);

const BrainIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const SparklesIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

// ===== SCROLL REVEAL HOOK =====
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// ===== ANIMATED COUNTER =====
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = Date.now();
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ===== MAIN COMPONENT =====
const AboutPage = () => {
  const [heroRef, heroVisible] = useScrollReveal();
  const [missionRef, missionVisible] = useScrollReveal();
  const [connectionRef, connectionVisible] = useScrollReveal();
  const [impactRef, impactVisible] = useScrollReveal();
  const [promiseRef, promiseVisible] = useScrollReveal();

  return (
    <div className="min-h-screen bg-[#0a0118] pt-20">
      
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[#0a0118]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Heart Badge */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-8">
              <HeartPulseIcon />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              We're Here to{' '}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Save Lives
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
              Behind every Alzheimer's patient is a person who deserves to feel safe, connected, and understood.
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              We're not just building technology. We're building bridges—between patients and their memories, 
              between families and their loved ones, between doctors and the people they care for.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/auth/signup"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                Join Our Mission
                <HeartIcon className="h-5 w-5" />
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 border-2 border-white/10 text-white font-semibold rounded-xl hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-2"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR MISSION - REDUCING FEAR ===== */}
      <section ref={missionRef} className="py-24 bg-[#0d0520] relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className={`text-center mb-20 transition-all duration-700 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/10 text-purple-300 font-medium text-sm rounded-full mb-6">
              <SparklesIcon />
              Our Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Reducing Fear.{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Restoring Hope.
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Alzheimer's can be terrifying—for patients and for families. We're changing that.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* For Patients */}
            <div 
              className={`group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 ${
                missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
              
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <UserIcon />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">For Patients</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  We help them feel less scared and confused. Our AI companion speaks gently, 
                  reminds them of loved ones' faces, and guides them through each day with patience and care.
                </p>
                
                <ul className="space-y-3">
                  {[
                    'Gentle voice guidance 24/7',
                    'Face recognition for familiar people',
                    'Calming routines and reminders',
                    'Always patient, never frustrated'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                        <CheckCircleIcon className="h-3 w-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* For Doctors */}
            <div 
              className={`group relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 ${
                missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
              
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <StethoscopeIcon />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">For Doctors</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  We give them superpowers. Real-time patient data, cognitive trends, and AI-assisted 
                  insights so they can provide better care to more patients.
                </p>
                
                <ul className="space-y-3">
                  {[
                    'Real-time patient monitoring',
                    'Cognitive decline analytics',
                    'Medication adherence tracking',
                    'AI-powered care recommendations'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                        <CheckCircleIcon className="h-3 w-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* For Families */}
            <div 
              className={`group relative bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-3xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 ${
                missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all" />
              
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                  <HomeIcon />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">For Families</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  We bring peace of mind. Know that your loved one is safe, connected, and cared for—
                  even when you can't be there in person.
                </p>
                
                <ul className="space-y-3">
                  {[
                    'Real-time location & safety alerts',
                    'Daily activity summaries',
                    'Video calls with AI assistance',
                    'Connect with care team instantly'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                        <CheckCircleIcon className="h-3 w-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONNECTION BRIDGE ===== */}
      <section ref={connectionRef} className="py-24 bg-[#0a0118] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${connectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bridging the{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Communication Gap
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              When Alzheimer's makes communication difficult, we step in to keep everyone connected.
            </p>
          </div>

          {/* Connection Diagram */}
          <div className={`relative transition-all duration-1000 ${connectionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              
              {/* Patient */}
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-30" />
                  <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 flex items-center justify-center mx-auto">
                    <UserIcon />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-6 mb-2">Patient</h3>
                <p className="text-sm text-gray-400">Feels safe & understood</p>
              </div>

              {/* Connection Line 1 */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
                  <ArrowRightIcon className="text-blue-400 flex-shrink-0" />
                </div>
              </div>

              {/* ALZCare.eg (Center) */}
              <div className="text-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600/20 to-violet-600/20 animate-pulse" />
                </div>
                <div className="relative">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-br from-purple-600 to-violet-700 border-4 border-purple-400/50 flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/30">
                    <div className="text-center">
                      <BrainIcon className="h-12 w-12 mx-auto mb-2" />
                      <span className="text-sm font-bold">ALZCare.eg</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-6 mb-2">Our AI Platform</h3>
                <p className="text-sm text-gray-400">The bridge that connects everyone</p>
              </div>

              {/* Connection Line 2 */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-pink-500" />
                  <ArrowRightIcon className="text-pink-400 flex-shrink-0" />
                </div>
              </div>

              {/* Doctor & Family */}
              <div className="text-center">
                <div className="flex justify-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20" />
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-500/50 flex items-center justify-center">
                      <StethoscopeIcon className="h-10 w-10" />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-pink-500 rounded-full blur-lg opacity-20" />
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/20 border-2 border-pink-500/50 flex items-center justify-center">
                      <UsersIcon />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-6 mb-2">Doctor & Family</h3>
                <p className="text-sm text-gray-400">Always informed & connected</p>
              </div>
            </div>

            {/* Connection Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                { icon: MessageCircleIcon, title: 'Seamless Communication', desc: 'Patients, doctors, and families stay connected through our AI-assisted platform' },
                { icon: ShieldCheckIcon, title: 'Real-Time Updates', desc: 'Everyone gets instant notifications about health changes, appointments, and care needs' },
                { icon: HandshakeIcon, title: 'Coordinated Care', desc: 'All caregivers work together with shared insights and synchronized care plans' },
              ].map((item, i) => (
                <div 
                  key={i}
                  className={`bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05] text-center transition-all duration-500 hover:bg-white/[0.06] ${
                    connectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="h-14 w-14 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4">
                    <item.icon />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section ref={impactRef} className="py-24 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-purple-600/20 relative overflow-hidden border-y border-purple-500/10">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className={`text-center mb-16 transition-all duration-700 ${impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Lives We've Touched
            </h2>
            <p className="text-xl text-gray-400">
              Every number represents a real person whose life is a little bit easier.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 10000, suffix: '+', label: 'Patients Helped', subtext: 'and counting' },
              { value: 500, suffix: '+', label: 'Doctors Connected', subtext: 'providing better care' },
              { value: 25000, suffix: '+', label: 'Families at Peace', subtext: 'knowing their loved ones are safe' },
              { value: 98, suffix: '%', label: 'Satisfaction Rate', subtext: 'from families we serve' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-white/[0.03] rounded-2xl border border-white/[0.05] transition-all duration-700 hover:bg-white/[0.06] ${
                  impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white font-medium mb-1">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR PROMISE ===== */}
      <section ref={promiseRef} className="py-24 bg-[#0a0118]">
        <div className="max-w-5xl mx-auto px-4">
          <div className={`relative bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-purple-600/20 rounded-3xl p-12 md:p-16 border border-purple-500/20 overflow-hidden transition-all duration-700 ${promiseVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl" />
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-6">
                <HeartIcon className="h-8 w-8 text-pink-400" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Promise to You
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                We promise to treat every patient like our own family. To innovate with compassion. 
                To bridge gaps that seem impossible. And to never, ever give up on anyone.
              </p>
              
              <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
                Because at the end of the day, we're not a technology company. 
                <span className="text-white font-medium"> We're a company that saves lives.</span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/auth/signup"
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                >
                  Start Your Journey
                  <ChevronRightIcon />
                </Link>
                <Link
                  to="/features"
                  className="px-8 py-4 border-2 border-white/10 text-white font-semibold rounded-xl hover:bg-white/[0.05] transition-all duration-300"
                >
                  Explore Our Platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
