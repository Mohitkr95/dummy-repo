import { useEffect, useState } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  type: 'heart' | 'sparkle' | 'star' | 'circle';
  sway: number;
}

interface CelebrationProps {
  onNext: () => void;
}

const particleColors = [
  '#d4a08e', '#c9907e', '#b87a68', '#e0b8a4',
  '#c2897a', '#d8a898', '#b5796a', '#e8c0ae',
  '#c09078', '#dab0a0',
];

export default function Celebration({ onNext }: CelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const types: Particle['type'][] = ['heart', 'sparkle', 'star', 'circle'];

    const generated: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 18 + 6,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
      type: types[Math.floor(Math.random() * types.length)],
      sway: (Math.random() - 0.5) * 100,
    }));
    setParticles(generated);

    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => setStep(4), 4800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const renderParticle = (p: Particle) => {
    switch (p.type) {
      case 'heart':
        return <Heart size={p.size} fill={p.color} style={{ color: p.color }} />;
      case 'sparkle':
        return <Sparkles size={p.size} style={{ color: p.color }} />;
      case 'star':
        return <Star size={p.size} fill={p.color} style={{ color: p.color }} />;
      default:
        return (
          <div
            className="rounded-full"
            style={{ width: p.size / 2, height: p.size / 2, backgroundColor: p.color }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden select-none">
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-confetti-fall"
            style={{
              left: `${p.x}%`,
              top: '-10%',
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--sway' as string]: `${p.sway}px`,
            }}
          >
            {renderParticle(p)}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-xl mx-auto">
        <div className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-4 mb-8">
            {[6, 10, 14, 10, 6].map((size, i) => (
              <Heart
                key={i}
                className="animate-heartbeat"
                fill="#b87a68"
                style={{
                  color: '#b87a68',
                  width: size * 1.5,
                  height: size * 1.5,
                  animationDelay: `${i * 0.15}s`,
                  filter: i === 2 ? 'drop-shadow(0 0 20px rgba(180,110,90,0.35))' : 'none',
                }}
              />
            ))}
          </div>

          <h1
            className="font-script text-6xl md:text-8xl mb-2 animate-pop-in animate-text-glow"
            style={{ color: '#5e3828' }}
          >
            Yayyyy!
          </h1>
          <p className="font-body text-sm tracking-[0.2em] uppercase font-medium animate-fade-in-up" style={{ color: '#8a6a5a' }}>
            she said yes!
          </p>
        </div>

        <div className={`mt-8 transition-all duration-1000 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-script text-2xl md:text-4xl leading-relaxed animate-sway-gentle" style={{ color: '#7a4e3e' }}>
            I knew you would say yes, Seetha!
          </p>
        </div>

        <div className={`mt-8 transition-all duration-1000 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            <p className="font-body text-base md:text-lg leading-[1.9] mb-4" style={{ color: '#5a3a2e' }}>
              You make every single day worth living.
              <br />
              Every moment with you feels like a gift I don't deserve
              <br />
              but will cherish forever.
            </p>
            <div className="h-px my-4" style={{ background: 'linear-gradient(to right, transparent, rgba(180,130,110,0.35), transparent)' }} />
            <p className="font-script text-xl md:text-2xl animate-text-glow" style={{ color: '#5e3828' }}>
              Happy Birthday & Happy Valentine's Day!
            </p>
          </div>
        </div>

        <div className={`mt-8 transition-all duration-1000 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col items-center gap-5">
            <p className="font-body text-xs tracking-wider font-medium" style={{ color: '#8a6a5a' }}>
              <span style={{ color: '#7a5548' }}>const</span> us = {'{'} love: <span style={{ color: '#7a5548' }}>Infinity</span>, expiry: <span style={{ color: '#7a5548' }}>never</span> {'}'};
            </p>

            <button
              onClick={onNext}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white font-body text-sm tracking-wider animate-glow-pulse cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #9e6e5c, #8a5e4e)',
              }}
            >
              <Heart className="w-4 h-4 group-hover:animate-wiggle" fill="currentColor" />
              <span>One More Thing...</span>
              <Heart className="w-4 h-4 group-hover:animate-wiggle" fill="currentColor" />
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              {[...Array(7)].map((_, i) => (
                <Heart
                  key={i}
                  className="animate-heartbeat"
                  fill="#b87a68"
                  style={{
                    color: '#b87a68',
                    animationDelay: `${i * 0.12}s`,
                    width: i === 3 ? 18 : i === 2 || i === 4 ? 14 : 10,
                    height: i === 3 ? 18 : i === 2 || i === 4 ? 14 : 10,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
