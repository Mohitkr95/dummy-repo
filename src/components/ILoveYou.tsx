import { useEffect, useState } from 'react';
import { Heart, Sparkles, Infinity } from 'lucide-react';

interface LoveParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function ILoveYou() {
  const [step, setStep] = useState(0);
  const [orbitHearts, setOrbitHearts] = useState<LoveParticle[]>([]);
  const [bgHearts, setBgHearts] = useState<LoveParticle[]>([]);

  useEffect(() => {
    setOrbitHearts(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.cos((i / 12) * Math.PI * 2) * 140,
        y: Math.sin((i / 12) * Math.PI * 2) * 140,
        size: Math.random() * 10 + 8,
        delay: i * 0.15,
        duration: 2,
      }))
    );
    setBgHearts(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 14 + 6,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      }))
    );

    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 3000),
      setTimeout(() => setStep(4), 4400),
      setTimeout(() => setStep(5), 5800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center px-4 relative select-none py-16 md:py-20">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {bgHearts.map((h) => (
          <div
            key={h.id}
            className="absolute animate-love-float"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              animationIterationCount: 'infinite',
            }}
          >
            <Heart fill="#d4a894" style={{ color: '#d4a894', width: h.size, height: h.size, opacity: 0.2 }} />
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative inline-block mb-8">
            <div className="relative">
              <Heart
                className="w-24 h-24 md:w-32 md:h-32 animate-heartbeat"
                fill="#b87a68"
                style={{
                  color: '#b87a68',
                  filter: 'drop-shadow(0 0 30px rgba(180,110,90,0.4))',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-script text-white text-lg md:text-xl" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>S</span>
              </div>
            </div>

            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '20s' }}>
              {orbitHearts.slice(0, 6).map((h) => (
                <div
                  key={h.id}
                  className="absolute animate-twinkle"
                  style={{
                    left: `calc(50% + ${h.x * 0.6}px)`,
                    top: `calc(50% + ${h.y * 0.6}px)`,
                    animationDelay: `${h.delay}s`,
                  }}
                >
                  <Heart fill="#c9907e" style={{ color: '#c9907e', width: h.size, height: h.size }} />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
              {orbitHearts.slice(6).map((h) => (
                <div
                  key={h.id}
                  className="absolute animate-twinkle"
                  style={{
                    left: `calc(50% + ${h.x * 1}px)`,
                    top: `calc(50% + ${h.y * 1}px)`,
                    animationDelay: `${h.delay + 1}s`,
                  }}
                >
                  <Sparkles style={{ color: '#d4a894', width: h.size * 0.7, height: h.size * 0.7 }} />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 animate-ring-expand rounded-full" style={{ border: '2px solid rgba(184,122,104,0.2)' }} />
            <div className="absolute inset-0 animate-ring-expand rounded-full" style={{ border: '2px solid rgba(184,122,104,0.15)', animationDelay: '0.75s' }} />
          </div>
        </div>

        <div className={`transition-all duration-1200 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="font-body text-sm tracking-[0.3em] uppercase mb-4 font-medium animate-fade-in-up" style={{ color: '#8a6a5a' }}>
            from the bottom of my heart
          </p>

          <h1
            className="font-script text-6xl md:text-8xl lg:text-9xl mb-3 animate-text-glow"
            style={{
              color: '#5e3828',
              filter: 'drop-shadow(0 0 40px rgba(150,90,70,0.1))',
            }}
          >
            I Love You
          </h1>

          <p className="font-script text-3xl md:text-5xl animate-sway-gentle" style={{ color: '#7a4e3e' }}>
            Seetha
          </p>
        </div>

        <div className={`mt-10 transition-all duration-1000 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            <p className="font-body text-base md:text-lg leading-[2] mb-3" style={{ color: '#5a3a2e' }}>
              You are my favourite notification,
              <br />
              my most visited page,
              <br />
              and the only bug I never want to fix.
            </p>
            <div className="h-px my-4" style={{ background: 'linear-gradient(to right, transparent, rgba(180,130,110,0.35), transparent)' }} />
            <p className="font-body text-base md:text-lg leading-[2]" style={{ color: '#5a3a2e' }}>
              Thank you for being you.
              <br />
              Thank you for choosing me.
              <br />
              Thank you for every smile, every laugh, every moment.
            </p>
          </div>
        </div>

        <div className={`mt-10 transition-all duration-1000 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div
            className="rounded-2xl p-5 md:p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(254,240,232,0.3))',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(200,160,140,0.2)',
            }}
          >
            <p className="font-body text-xs tracking-wider mb-3 font-medium" style={{ color: '#8a6a5a' }}>
              {'while (alive) {'}
            </p>
            <p className="font-script text-xl md:text-2xl animate-text-glow" style={{ color: '#5e3828' }}>
              love(Seetha);
            </p>
            <p className="font-body text-xs tracking-wider mt-3 font-medium" style={{ color: '#8a6a5a' }}>
              {'}'}
            </p>
          </div>
        </div>

        <div className={`mt-10 transition-all duration-1000 ${step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(180,130,110,0.35))' }} />
            <Infinity className="w-6 h-6 animate-pulse-soft" style={{ color: '#9a7568' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(180,130,110,0.35))' }} />
          </div>

          <div
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full animate-glow-pulse"
            style={{
              background: 'linear-gradient(135deg, #9e6e5c, #8a5e4e)',
              boxShadow: '0 10px 40px -10px rgba(150,90,70,0.45)',
            }}
          >
            <Heart className="w-5 h-5 animate-heartbeat text-white" fill="currentColor" />
            <span className="text-white font-body text-sm tracking-wider font-semibold">
              Forever Yours
            </span>
            <Heart className="w-5 h-5 animate-heartbeat text-white" fill="currentColor" style={{ animationDelay: '0.3s' }} />
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {[...Array(9)].map((_, i) => (
              <Heart
                key={i}
                className="animate-heartbeat"
                fill="#b87a68"
                style={{
                  color: '#b87a68',
                  animationDelay: `${i * 0.1}s`,
                  width: i === 4 ? 22 : i === 3 || i === 5 ? 18 : i === 2 || i === 6 ? 14 : 10,
                  height: i === 4 ? 22 : i === 3 || i === 5 ? 18 : i === 2 || i === 6 ? 14 : 10,
                  filter: i === 4 ? 'drop-shadow(0 0 12px rgba(180,110,90,0.4))' : 'none',
                }}
              />
            ))}
          </div>

          <p className="mt-8 pb-4 font-body text-[10px] tracking-[0.25em] uppercase" style={{ color: '#b8978a' }}>
            made with all my love, just for you
          </p>
        </div>
      </div>
    </div>
  );
}
