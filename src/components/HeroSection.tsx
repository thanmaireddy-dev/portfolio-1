import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [subtitles] = useState('');

  // Auto-hide "Tap for sound" hint after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Auto-mute video when scrolling past hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const v = videoRef.current;
          if (v && !v.muted) {
            v.muted = true;
            setMuted(true);
          }
        }
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Snap-scroll: one wheel tick / keypress while at top → jump to About
  useEffect(() => {
    let fired = false;

      const goToAbout = () => {
        if (fired) return;
        fired = true;
        const about = document.getElementById('about');
        if (about) about.scrollIntoView({ behavior: 'auto', block: 'start' });
      };

    const onWheel = (e: WheelEvent) => {
      if (fired) return;
      if (e.deltaY <= 0) return;
      if (window.scrollY > 50) return;
      e.preventDefault();
      goToAbout();
    };

    const onKey = (e: KeyboardEvent) => {
      if (fired) return;
      if (window.scrollY > 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToAbout();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    
    const newMuted = !v.muted;
    v.muted = newMuted;
    setMuted(newMuted);
    setShowSoundHint(false);

    if (!newMuted) {
      // Sync video playback to start exactly from the beginning when unmuting
      v.currentTime = 0;
      v.play().catch(err => console.log("Video play interrupted:", err));
    }
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'contrast(1.05) brightness(1.05) saturate(1.02)' }}
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient overlays - lightened for maximum video clarity and brightness */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <FadeIn delay={0} y={-20} className="relative">
          <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
            <ul className="flex items-center gap-5 sm:gap-8 md:gap-12">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition duration-300 hover:scale-[1.05]"
                    style={{
                      background: 'linear-gradient(135deg, #0084FF 0%, #00F0FF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 8px rgba(0, 132, 255, 0.6))',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-[#0084FF]/35 bg-[#0084FF]/10 px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md transition duration-300 hover:bg-[#0084FF]/25 hover:border-[#00F0FF]/60 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,132,255,0.4)]"
            >
              <span
                className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
                style={{
                  background: 'linear-gradient(135deg, #0084FF 0%, #00F0FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 8px rgba(0, 132, 255, 0.6))',
                }}
              >
                Email me
              </span>
            </a>
          </div>
        </FadeIn>        {/* Flex spacer to maintain top and bottom bar layout */}
        <div className="flex-1" />
        {/* Bottom bar */}
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
          {/* Scroll indicator */}
          <FadeIn delay={1.1} y={20}>
            <a href="#about" aria-label="Scroll to next section" className="group flex flex-col items-center gap-3 translate-y-3 sm:translate-y-5">
              <span
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.35em] transition duration-300 group-hover:scale-[1.05]"
                style={{
                  background: 'linear-gradient(135deg, #0084FF 0%, #00F0FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 8px rgba(0, 132, 255, 0.6))',
                }}
              >
                Scroll
              </span>
              <div className="relative h-12 w-[2px] overflow-hidden bg-[#0084FF]/20 rounded-full transition duration-300 group-hover:bg-[#0084FF]/40">
                <span
                  className="absolute inset-x-0 top-0 h-1/2 w-full bg-gradient-to-b from-[#0084FF] to-[#00F0FF]"
                  style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
                />
              </div>
            </a>
          </FadeIn>

          {/* Mute toggle + Sound hint */}
          <FadeIn delay={1.1} y={20}>
            <div className="flex items-center gap-3">
              {showSoundHint && (
                <span
                  className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.25em] text-white/80"
                  style={{ animation: 'pulseFade 2s ease-in-out infinite' }}
                >
                  Tap for sound
                </span>
              )}
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110"
              >
                {muted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Subtitles Overlay - Statically Visible from Starting */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="absolute bottom-28 left-1/2 z-20 w-[90%] max-w-2xl -translate-x-1/2 text-center"
      >
        <div className="rounded-2xl border border-[#0084FF]/25 bg-black/85 px-6 py-4 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,132,255,0.18)] hover:border-[#0084FF]/50 transition-colors duration-300">
          <span
            className="block text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.25em] leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, #0084FF 0%, #00F0FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 10px rgba(0, 132, 255, 0.6))',
            }}
          >
            HELLO, I AM THANMAI · APP DEVELOPER · AI & WEB BUILDER · IOT CREATOR · TECH LEADER
          </span>
          <p className="mt-2 text-[#D7E2EA]/80 font-light text-xs sm:text-sm tracking-wide">
            I build practical digital experiences, AI-powered tools, and creative tech projects that solve real-world problems.
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
