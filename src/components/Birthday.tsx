import { useState, useEffect } from 'react';
import { Cake, Heart, Sparkles, Star, PartyPopper } from 'lucide-react';

interface BirthdayProps {
  onNext: () => void;
}

export default function Birthday({ onNext }: BirthdayProps) {
  const [step, setStep] = useState(0);
  const [stars, setStars] = useState<{ id: number; x: number; delay: number }[]>([]);
  const [burstHearts, setBurstHearts] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: i * 7 + 2,
        delay: i * 0.15,
      }))
    );

    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => {
        setStep(3);
        setBurstHearts(
          Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            size: Math.random() * 12 + 6,
          }))
        );
      }, 3200),
      setTimeout(() => setStep(4), 4800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 select-none relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute animate-rise-sparkle"
            style={{
              left: `${s.x}%`,
              bottom: '-5%',
              animationDelay: `${s.delay + 1}s`,
            }}
          >
            <Star className="w-3.5 h-3.5 animate-spin-slow" fill="#c9987e" style={{ color: '#c9987e' }} />
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className={`transition-all duration-1000 ${step >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block mb-8">
            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center animate-float-rotate animate-glow-pulse"
              style={{
                background: 'linear-gradient(135deg, #fef0e8, #fbe5da)',
              }}
            >
              <Cake className="w-12 h-12 md:w-14 md:h-14" strokeWidth={1.5} style={{ color: '#8e5e4e' }} />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 animate-twinkle" style={{ color: '#b07a62' }} />
            <Sparkles className="absolute -bottom-1 -left-3 w-5 h-5 animate-twinkle" style={{ color: '#a07060', animationDelay: '1s' }} />
            <PartyPopper className="absolute -top-3 -left-4 w-5 h-5 animate-wiggle" style={{ color: '#c9907e' }} />

            {burstHearts.map((h) => (
              <div
                key={h.id}
                className="absolute top-1/2 left-1/2 animate-heart-burst"
                style={{
                  ['--burst-x' as string]: `${h.x}px`,
                  ['--burst-y' as string]: `${h.y}px`,
                }}
              >
                <Heart fill="#b87a68" style={{ color: '#b87a68', width: h.size, height: h.size }} />
              </div>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium animate-fade-in-up" style={{ color: '#8a6a5a' }}>
            to the most beautiful soul
          </p>
          <h1 className="font-script text-5xl md:text-7xl mb-2 animate-text-glow" style={{ color: '#5e3828' }}>
            Happy Birthday
          </h1>
          <p className="font-script text-3xl md:text-5xl animate-sway-gentle" style={{ color: '#7a4e3e' }}>
            Seetha!
          </p>
        </div>

        <div className={`mt-10 transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div
            className="rounded-2xl p-6 md:p-8 animate-scale-breathe"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(254,240,232,0.45))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(200,160,140,0.3)',
              boxShadow: '0 12px 40px -12px rgba(160,110,85,0.15)',
              animationDuration: '5s',
            }}
          >
            <p className="font-body text-base md:text-lg leading-[1.9]" style={{ color: '#5a3a2e' }}>
              Another year of you being absolutely wonderful.
              <br />
              The world got a little more beautiful the day you were born.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="animate-heartbeat"
                  fill="#b87a68"
                  style={{
                    color: '#b87a68',
                    animationDelay: `${i * 0.15}s`,
                    width: i === 2 ? 20 : i === 1 || i === 3 ? 16 : 12,
                    height: i === 2 ? 20 : i === 1 || i === 3 ? 16 : 12,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-10 transition-all duration-1000 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-xs tracking-[0.2em] uppercase mb-5 font-medium animate-pulse-soft" style={{ color: '#8a6a5a' }}>
            but wait, there's more...
          </p>

          <button
            onClick={onNext}
            className={`group relative px-9 py-3.5 rounded-full font-body text-sm tracking-[0.15em] uppercase overflow-hidden transition-all duration-500 ${
              step >= 4 ? 'opacity-100 animate-pop-in-bounce' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div
              className="absolute inset-0 rounded-full transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #9e6e5c, #8a5e4e)' }}
            />
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #8a5e4e, #7a5040)' }}
            />
            <span className="relative z-10 text-white flex items-center gap-2">
              Continue
              <Heart className="w-3.5 h-3.5 group-hover:animate-wiggle" fill="currentColor" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
