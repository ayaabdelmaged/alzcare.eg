import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ===== ICONS =====
const HeartIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ActivityIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const BellIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);

const UsersIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const PlusIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="M12 5v14"/>
  </svg>
);

const BrainIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54"/>
  </svg>
);

const StethoscopeIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>
);

const HomeIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ClockIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const SparklesIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const PillIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
    <path d="m8.5 8.5 7 7"/>
  </svg>
);

const GamepadIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" x2="10" y1="12" y2="12"/>
    <line x1="8" x2="8" y1="10" y2="14"/>
    <line x1="15" x2="15.01" y1="13" y2="13"/>
    <line x1="18" x2="18.01" y1="11" y2="11"/>
    <rect width="20" height="12" x="2" y="6" rx="2"/>
  </svg>
);

const SmileIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" x2="9.01" y1="9" y2="9"/>
    <line x1="15" x2="15.01" y1="9" y2="9"/>
  </svg>
);

const FrownIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
    <line x1="9" x2="9.01" y1="9" y2="9"/>
    <line x1="15" x2="15.01" y1="9" y2="9"/>
  </svg>
);

const MehIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="8" x2="16" y1="15" y2="15"/>
    <line x1="9" x2="9.01" y1="9" y2="9"/>
    <line x1="15" x2="15.01" y1="9" y2="9"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const XCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" x2="9" y1="9" y2="15"/>
    <line x1="9" x2="15" y1="9" y2="15"/>
  </svg>
);

const ImageIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const NavigationIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

const VideoIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8Z"/>
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
  </svg>
);

const MessageCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
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

// ===== MOOD BADGE COMPONENT =====
const MoodBadge = ({ mood, size = 'sm' }) => {
  const moodConfig = {
    happy: { icon: SmileIcon, color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Happy' },
    neutral: { icon: MehIcon, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Neutral' },
    sad: { icon: FrownIcon, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', label: 'Sad' },
    anxious: { icon: AlertCircleIcon, color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Anxious' }
  };
  
  const config = moodConfig[mood] || moodConfig.neutral;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <Icon />
      {config.label}
    </span>
  );
};

// ===== MAIN COMPONENT =====
const DashboardShowcase = () => {
  const [activeTab, setActiveTab] = useState('family');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [heroRef, heroVisible] = useScrollReveal();
  const [previewRef, previewVisible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useScrollReveal();

  // Smooth tab switch handler
  const handleTabSwitch = (tab) => {
    if (tab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 150);
  };

  // Sample patients data for Admin/Doctor Dashboard
  const patients = [
    { 
      id: 1, 
      name: 'Ahmed Hassan', 
      age: 52, 
      level: 'Stage 3', 
      phone: '+20 101 234 5678',
      mood: 'happy',
      lastMoodCheck: '15 min ago',
      medications: [
        { name: 'Donepezil', dosage: '10mg', time: '09:00', status: 'taken' },
        { name: 'Memantine', dosage: '20mg', time: '12:00', status: 'pending' },
        { name: 'Vitamin D', dosage: '2000IU', time: '18:00', status: 'upcoming' }
      ],
      quizzes: [
        { name: 'Picture Matching', type: 'Memory', lastCompleted: 'Yesterday', score: 85 }
      ]
    },
    { 
      id: 2, 
      name: 'Ali Mohamed', 
      age: 48, 
      level: 'Stage 4', 
      phone: '+20 112 345 6789',
      mood: 'anxious',
      lastMoodCheck: '30 min ago',
      medications: [
        { name: 'Rivastigmine', dosage: '6mg', time: '08:00', status: 'missed' },
        { name: 'Galantamine', dosage: '16mg', time: '14:00', status: 'pending' }
      ],
      quizzes: []
    },
    { 
      id: 3, 
      name: 'Fatma Ibrahim', 
      age: 45, 
      level: 'Stage 2', 
      phone: '+20 100 456 7890',
      mood: 'neutral',
      lastMoodCheck: '1 hour ago',
      medications: [
        { name: 'Donepezil', dosage: '5mg', time: '09:00', status: 'taken' }
      ],
      quizzes: [
        { name: 'Word Recall', type: 'Cognitive', lastCompleted: 'Today', score: 92 }
      ]
    }
  ];

  // Notifications for Doctor Dashboard
  const doctorNotifications = [
    { type: 'medication', message: 'Ali Mohamed missed morning medication', priority: 'high', time: '30 min ago' },
    { type: 'mood', message: 'Ali Mohamed mood changed to Anxious', priority: 'high', time: '30 min ago' },
    { type: 'medication', message: 'Ahmed Hassan medication due in 30 min', priority: 'medium', time: '15 min ago' },
    { type: 'quiz', message: 'Fatma Ibrahim completed Daily Quiz (92%)', priority: 'low', time: '1 hour ago' }
  ];

  // Family members for Family Dashboard
  const familyMembers = [
    { name: 'Omar Hassan', age: 42, relation: 'Son' },
    { name: 'Mona Hassan', age: 38, relation: 'Daughter' },
    { name: 'Youssef Omar', age: 22, relation: 'Grandson' },
    { name: 'Nour Omar', age: 19, relation: 'Granddaughter' }
  ];

  // Schedules for Family Dashboard
  const schedules = [
    { title: 'Morning Walk', time: '08:00', type: 'activity', status: 'completed' },
    { title: 'Lunch & Medication', time: '12:30', type: 'meal', status: 'upcoming' },
    { title: 'Memory Games', time: '14:00', type: 'activity', status: 'upcoming' }
  ];

  const getMedicationStatusStyle = (status) => {
    switch (status) {
      case 'taken': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'missed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 border-l-red-500';
      case 'medium': return 'bg-amber-500/10 border-l-amber-500';
      default: return 'bg-blue-500/10 border-l-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0118] pt-20">
      
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/10 text-purple-300 font-medium text-sm rounded-full mb-6">
              <SparklesIcon />
              Dashboard Demo
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Experience{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                Smart Care
              </span>
              <br />in Action
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              This is how your dashboard will look when you join ALZCare.eg - 
              complete patient management, medication tracking, and more.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TAB SELECTOR ===== */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex justify-center">
          <div className="relative inline-flex p-1.5 bg-white/[0.05] border border-white/10 rounded-2xl">
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl transition-all duration-300 ease-out ${
                activeTab === 'family' 
                  ? 'left-1.5 bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-purple-500/25' 
                  : 'left-[calc(50%+3px)] bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25'
              }`}
            />
            
            <button
              onClick={() => handleTabSwitch('family')}
              className={`relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                activeTab === 'family' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <HomeIcon />
              <span>Family Dashboard</span>
            </button>
            
            <button
              onClick={() => handleTabSwitch('doctor')}
              className={`relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                activeTab === 'doctor' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <StethoscopeIcon />
              <span>Doctor Dashboard</span>
            </button>
          </div>
        </div>
        <p className="text-center text-gray-600 text-sm mt-3">
          Switch between dashboard views to see different features
        </p>
      </div>

      {/* ===== DASHBOARD PREVIEW ===== */}
      <section ref={previewRef} className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-700 ${previewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`transition-opacity duration-150 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            
              {/* ===== DOCTOR/ADMIN DASHBOARD ===== */}
              {activeTab === 'doctor' && (
                <div className="bg-[#0d0520] rounded-3xl border border-purple-500/20 overflow-hidden shadow-2xl">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                          <StethoscopeIcon />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
                          <p className="text-sm text-gray-400">Manage patients, medications & activities</p>
                        </div>
                      </div>
                      <button className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-medium flex items-center gap-2 text-sm">
                        <PlusIcon />
                        Add Patient
                      </button>
                    </div>
                  </div>

                  <div className="p-6 lg:p-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {[
                        { icon: UsersIcon, value: '3', label: 'Total Patients', color: 'purple' },
                        { icon: PillIcon, value: '4', label: 'Meds Taken Today', color: 'green' },
                        { icon: AlertCircleIcon, value: '2', label: 'Urgent Alerts', color: 'red' },
                        { icon: GamepadIcon, value: '5', label: 'Active Quizzes', color: 'blue' }
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]">
                          <div className="flex items-center justify-between mb-2">
                            <div className={`h-10 w-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-400`}>
                              <stat.icon />
                            </div>
                            <span className="text-2xl font-bold text-white">{stat.value}</span>
                          </div>
                          <p className="text-sm text-gray-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Patients List */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.05] overflow-hidden">
                          <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Patients Overview</h3>
                            <span className="text-sm text-gray-500">{patients.length} patients</span>
                          </div>
                          
                          <div className="divide-y divide-white/[0.05]">
                            {patients.map((patient) => (
                              <div key={patient.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-start gap-4">
                                  {/* Avatar */}
                                  <div className="relative">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold">
                                      {patient.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#0d0520] ${
                                      patient.mood === 'happy' ? 'bg-green-500' :
                                      patient.mood === 'anxious' ? 'bg-red-500' : 'bg-blue-500'
                                    }`} />
                                  </div>
                                  
                                  {/* Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold text-white">{patient.name}</h4>
                                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">
                                        {patient.level}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{patient.age} yrs • {patient.phone}</p>
                                    
                                    {/* Mood & Meds */}
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                      <MoodBadge mood={patient.mood} />
                                      <span className="text-xs text-gray-600">•</span>
                                      <span className="text-xs text-gray-400">
                                        {patient.medications.filter(m => m.status === 'taken').length}/{patient.medications.length} meds taken
                                      </span>
                                    </div>
                                  </div>
                                  
                                  {/* Actions */}
                                  <div className="flex items-center gap-2">
                                    <button className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors" title="Add Medication">
                                      <PillIcon />
                                    </button>
                                    <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors" title="Add Quiz">
                                      <GamepadIcon />
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Medications Row */}
                                <div className="mt-3 pt-3 border-t border-white/[0.05]">
                                  <div className="flex flex-wrap gap-2">
                                    {patient.medications.map((med, i) => (
                                      <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 bg-white/[0.03] rounded-lg text-xs">
                                        <span className="text-gray-300">{med.name} ({med.dosage})</span>
                                        <span className={`px-1.5 py-0.5 rounded border ${getMedicationStatusStyle(med.status)}`}>
                                          {med.status}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Mood Overview */}
                        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.05] p-5">
                          <h3 className="text-lg font-bold text-white mb-4">Mood Check Overview</h3>
                          <div className="grid grid-cols-4 gap-3">
                            {[
                              { mood: 'happy', count: 1, color: 'green' },
                              { mood: 'neutral', count: 1, color: 'blue' },
                              { mood: 'sad', count: 0, color: 'amber' },
                              { mood: 'anxious', count: 1, color: 'red' }
                            ].map((item, i) => (
                              <div key={i} className={`bg-${item.color}-500/10 rounded-xl p-3 border border-${item.color}-500/20 text-center`}>
                                <div className={`text-2xl font-bold text-${item.color}-400`}>{item.count}</div>
                                <p className="text-xs text-gray-400 capitalize">{item.mood}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Sidebar - Notifications */}
                      <div className="space-y-6">
                        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.05] overflow-hidden">
                          <div className="bg-red-500/10 p-4 border-b border-red-500/20 flex items-center justify-between">
                            <h3 className="font-bold text-white flex items-center gap-2">
                              <BellIcon className="text-red-400" />
                              Notifications
                            </h3>
                            <span className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-bold">
                              {doctorNotifications.filter(n => n.priority === 'high').length}
                            </span>
                          </div>
                          <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
                            {doctorNotifications.map((notif, i) => (
                              <div key={i} className={`p-3 rounded-lg border-l-4 ${getPriorityStyle(notif.priority)}`}>
                                <p className="text-sm text-gray-300">{notif.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-5 border border-purple-500/30">
                          <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                          <div className="space-y-2">
                            {[
                              { icon: UsersIcon, label: 'Add New Patient', color: 'purple' },
                              { icon: PillIcon, label: 'Add Medication', color: 'green' },
                              { icon: GamepadIcon, label: 'Add Memory Quiz', color: 'blue' }
                            ].map((action, i) => (
                              <button key={i} className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left">
                                <div className={`h-8 w-8 rounded-lg bg-${action.color}-500/30 flex items-center justify-center text-${action.color}-400`}>
                                  <action.icon />
                                </div>
                                <span className="text-sm text-white font-medium">{action.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== FAMILY DASHBOARD ===== */}
              {activeTab === 'family' && (
                <div className="bg-[#0d0520] rounded-3xl border border-purple-500/20 overflow-hidden shadow-2xl">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border-b border-white/10 p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white">
                          <HomeIcon />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">Family Dashboard</h2>
                          <p className="text-sm text-gray-400">Monitor and care for your loved one</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium border border-green-500/30 flex items-center gap-2">
                          <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                          Live
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Patient Status */}
                        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                              AH
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">Ahmed Hassan</h3>
                              <p className="text-gray-400">52 years old</p>
                            </div>
                          </div>

                          {/* Vitals */}
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { icon: MapPinIcon, value: 'Raml Station', label: 'Location', color: 'blue' },
                              { icon: ActivityIcon, value: 'Active', label: 'Activity', color: 'green' },
                              { icon: SmileIcon, value: 'Happy', label: 'Mood', color: 'purple' }
                            ].map((vital, i) => (
                              <div key={i} className={`bg-${vital.color}-500/10 rounded-xl p-3 border border-${vital.color}-500/20`}>
                                <div className={`h-8 w-8 rounded-lg bg-${vital.color}-500/20 flex items-center justify-center text-${vital.color}-400 mb-2`}>
                                  <vital.icon />
                                </div>
                                <p className="text-sm font-bold text-white">{vital.value}{vital.unit && <span className="text-xs text-gray-400 ml-1">{vital.unit}</span>}</p>
                                <p className="text-xs text-gray-500">{vital.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Mood Check */}
                        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <SmileIcon className="text-purple-400" />
                            Mood Check
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <SmileIcon className="text-green-400" />
                                <span className="text-lg font-bold text-white">Happy</span>
                              </div>
                              <p className="text-sm text-gray-400">Current emotional state</p>
                              <p className="text-xs text-gray-500 mt-2">Last check: 15 min ago</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-400 mb-2">Today's History</p>
                              {[
                                { time: '8:00 AM', mood: 'neutral' },
                                { time: '10:30 AM', mood: 'happy' },
                                { time: '2:00 PM', mood: 'happy' }
                              ].map((entry, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-white/[0.03] rounded-lg">
                                  <span className="text-xs text-gray-500">{entry.time}</span>
                                  <MoodBadge mood={entry.mood} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Schedules */}
                        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <CalendarIcon className="text-purple-400" />
                              Today's Schedule
                            </h3>
                            <button className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium flex items-center gap-1">
                              <PlusIcon className="h-4 w-4" />
                              Add
                            </button>
                          </div>
                          <div className="space-y-2">
                            {schedules.map((schedule, i) => (
                              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${
                                schedule.status === 'completed' ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/[0.03] border border-white/[0.05]'
                              }`}>
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                  schedule.type === 'activity' ? 'bg-green-500/20 text-green-400' :
                                  schedule.type === 'social' ? 'bg-blue-500/20 text-blue-400' :
                                  'bg-amber-500/20 text-amber-400'
                                }`}>
                                  <ClockIcon />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-white text-sm">{schedule.title}</p>
                                  <p className="text-xs text-gray-500">{schedule.time}</p>
                                </div>
                                <span className={`text-xs font-medium ${schedule.status === 'completed' ? 'text-green-400' : 'text-gray-500'}`}>
                                  {schedule.status === 'completed' ? '✓ Done' : 'Upcoming'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Family Members */}
                        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <UsersIcon className="text-purple-400" />
                              Family Members
                            </h3>
                            <button className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium flex items-center gap-1">
                              <PlusIcon className="h-4 w-4" />
                              Add
                            </button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {familyMembers.map((member, i) => (
                              <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05] text-center">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold mx-auto mb-2">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <p className="font-medium text-white text-sm truncate">{member.name}</p>
                                <p className="text-xs text-gray-500">{member.age} yrs</p>
                                <span className="inline-block mt-1 px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">
                                  {member.relation}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Location Tracking */}
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-5 border border-blue-500/30">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <MapPinIcon className="text-blue-400" />
                            Location Tracking
                          </h3>
                          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Current Location</p>
                                <p className="text-lg font-bold text-white">Raml Station</p>
                              </div>
                              <span className="px-2 py-1 bg-green-500/30 text-green-400 rounded-lg text-xs font-medium">
                                ✓ Safe Zone
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Last updated: Just now</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-400">Safe Zones</p>
                            <div className="grid grid-cols-2 gap-2">
                              {['Raml Station', 'Champollion', 'Smouha', 'Sidi Gaber'].map((zone, i) => (
                                <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${
                                  zone === 'Raml Station' ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/[0.05]'
                                }`}>
                                  <MapPinIcon className={`h-4 w-4 ${zone === 'Raml Station' ? 'text-purple-400' : 'text-gray-500'}`} />
                                  <span className={`text-xs ${zone === 'Raml Station' ? 'text-white font-medium' : 'text-gray-400'}`}>{zone}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <button className="w-full mt-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                            <NavigationIcon className="h-4 w-4" />
                            Get Directions
                          </button>
                        </div>

                        {/* Medications */}
                        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <PillIcon className="text-purple-400" />
                            Medications
                          </h3>
                          <div className="space-y-2">
                            {patients[0].medications.map((med, i) => (
                              <div key={i} className="flex items-center justify-between p-2.5 bg-white/[0.03] rounded-lg">
                                <div>
                                  <p className="text-sm font-medium text-white">{med.name}</p>
                                  <p className="text-xs text-gray-500">{med.dosage} • {med.time}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium border capitalize ${getMedicationStatusStyle(med.status)}`}>
                                  {med.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Emergency Contacts */}
                        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-5 border border-purple-500/30">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <PhoneIcon className="text-purple-400" />
                            Emergency Contacts
                          </h3>
                          <div className="space-y-2">
                            {[
                              { name: 'Dr. Mohamed Khalil', role: 'Neurologist' },
                              { name: 'Omar Hassan', role: 'Son' }
                            ].map((contact, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                                <div>
                                  <p className="font-medium text-white text-sm">{contact.name}</p>
                                  <p className="text-xs text-gray-400">{contact.role}</p>
                                </div>
                                <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium">
                                  Call
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section ref={featuresRef} className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our System?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for complete Alzheimer's care management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: UsersIcon, title: 'Patient Management', desc: 'Add patients with complete profiles - name, age, stage, description, photo, and contact info.', color: 'purple' },
              { icon: PillIcon, title: 'Medication Tracking', desc: 'Schedule medications with times, dosages, and get real-time status updates (taken/missed/pending).', color: 'green' },
              { icon: GamepadIcon, title: 'Memory Activities', desc: 'Create quizzes and memory exercises scheduled every 2 days to keep cognitive functions active.', color: 'blue' },
              { icon: SmileIcon, title: 'Mood Monitoring', desc: 'Track emotional states throughout the day with instant alerts for sudden mood changes.', color: 'pink' },
              { icon: MapPinIcon, title: 'Location Tracking', desc: 'Real-time GPS tracking with safe zone alerts when patient leaves designated areas.', color: 'cyan' },
              { icon: BellIcon, title: 'Smart Notifications', desc: 'Get alerts for missed medications, mood changes, location updates, and scheduled activities.', color: 'amber' },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-500 ${
                  featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`h-14 w-14 rounded-xl bg-${feature.color}-500/20 border border-${feature.color}-500/30 flex items-center justify-center text-${feature.color}-400 mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-purple-600/20 rounded-3xl p-12 border border-purple-500/20 overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
                <BrainIcon className="h-8 w-8 text-purple-400" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Care?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
                Join thousands of families and healthcare providers who trust ALZCare.eg 
                for compassionate, intelligent Alzheimer's care.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/auth/signup"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                >
                  Get Started Free
                  <ChevronRightIcon />
                </Link>
                <Link
                  to="/features"
                  className="px-8 py-4 border-2 border-white/10 text-white font-semibold rounded-xl hover:bg-white/[0.05] transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardShowcase;
