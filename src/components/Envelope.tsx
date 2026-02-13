import { useState, useEffect } from 'react';
import { Heart, Gift } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number; size: number }[]>([]);
  const [showRings, setShowRings] = useState(false);

  useEffect(() => {
    const s = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 380 - 190,
      y: Math.random() * 280 - 140,
      delay: Math.random() * 5,
      size: Math.random() * 5 + 2,
    }));
    setSparkles(s);
    setTimeout(() => setShowRings(true), 500);
  }, []);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(onOpen, 1400);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 select-none">
      <div className="animate-fade-in-slow mb-16 text-center relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #ffd0b5 0%, transparent 70%)' }} />
        <div className="relative">
          <p className="font-body text-xs md:text-sm tracking-[0.35em] uppercase mb-3 font-semibold animate-text-glow" style={{ color: '#a5766a', letterSpacing: '0.4em' }}>
            a little something special
          </p>
          <p className="font-script text-4xl md:text-5xl tracking-wide animate-sway-gentle mb-1" style={{ color: '#6e4538', textShadow: '0 2px 12px rgba(110,69,56,0.08)' }}>
            14th February
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9987e, transparent)' }} />
            <Heart className="w-3 h-3 animate-heartbeat" fill="#c9987e" style={{ color: '#c9987e' }} />
            <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9987e, transparent)' }} />
          </div>
        </div>
      </div>

      <div
        onClick={handleClick}
        className={`relative cursor-pointer group transition-all duration-[1400ms] ease-out ${
          isOpening ? 'scale-125 opacity-0 -translate-y-16 blur-sm' : 'hover:scale-[1.03]'
        }`}
      >
        <div className="relative">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="absolute animate-twinkle"
              style={{
                left: `calc(50% + ${s.x}px)`,
                top: `calc(50% + ${s.y}px)`,
                animationDelay: `${s.delay}s`,
              }}
            >
              <div
                className="rounded-full"
                style={{ width: s.size, height: s.size, backgroundColor: '#d4a894' }}
              />
            </div>
          ))}

          <div className="relative w-80 h-52 md:w-[30rem] md:h-[20rem]">
            {showRings && (
              <>
                <div
                  className="absolute inset-0 rounded-[2rem] animate-ring-expand"
                  style={{ border: '2px solid rgba(200,140,120,0.12)' }}
                />
                <div
                  className="absolute inset-0 rounded-[2rem] animate-ring-expand"
                  style={{ border: '2px solid rgba(200,140,120,0.08)', animationDelay: '0.5s' }}
                />
                <div
                  className="absolute inset-0 rounded-[2rem] animate-ring-expand"
                  style={{ border: '1px solid rgba(200,140,120,0.05)', animationDelay: '1s' }}
                />
              </>
            )}

            <div
              className="absolute inset-0 rounded-[2rem] overflow-hidden animate-envelope-hover backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, #fffcfa 0%, #fff5ef 20%, #ffe9dd 45%, #ffdece 70%, #ffdbcc 90%, #ffe5d9 100%)',
                boxShadow: '0 25px 80px -20px rgba(150,90,70,0.35), 0 15px 40px -15px rgba(150,90,70,0.2), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(200,150,130,0.15)',
                border: '1px solid rgba(255,240,230,0.9)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-20 animate-shimmer" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 100%)' }} />
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,210,180,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,190,160,0.3) 0%, transparent 50%)' }} />

              <div className="absolute top-0 left-0 right-0 h-px animate-shimmer" style={{ background: 'linear-gradient(to right, transparent, rgba(220,180,160,0.6), transparent, rgba(220,180,160,0.4), transparent)' }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center relative z-10">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 blur-xl opacity-40 animate-scale-breathe" style={{ background: 'radial-gradient(circle, #d4967e 0%, transparent 70%)' }} />
                    <div className="relative">
                      <Gift className="w-14 h-14 md:w-16 md:h-16 animate-float-rotate group-hover:animate-wiggle" strokeWidth={1.3} style={{ color: '#9e6e5c', filter: 'drop-shadow(0 4px 12px rgba(158,110,92,0.15))' }} />
                      <Heart
                        className="absolute -top-2 -right-3 w-5 h-5 animate-heartbeat"
                        fill="#c97860"
                        style={{ color: '#c97860', filter: 'drop-shadow(0 2px 8px rgba(201,120,96,0.25))' }}
                      />
                      <div
                        className="absolute -top-4 -left-4 w-2.5 h-2.5 rounded-full animate-twinkle"
                        style={{ backgroundColor: '#eab59e', animationDelay: '0.5s', boxShadow: '0 0 8px rgba(234,181,158,0.6)' }}
                      />
                      <div
                        className="absolute -bottom-3 -right-4 w-2 h-2 rounded-full animate-twinkle"
                        style={{ backgroundColor: '#d9a88e', animationDelay: '1.5s', boxShadow: '0 0 6px rgba(217,168,142,0.5)' }}
                      />
                      <div
                        className="absolute top-1/2 -left-5 w-1.5 h-1.5 rounded-full animate-twinkle"
                        style={{ backgroundColor: '#c9987e', animationDelay: '2.2s' }}
                      />
                    </div>
                  </div>
                  <p className="font-script text-4xl md:text-5xl mb-2.5 animate-text-glow tracking-wide" style={{ color: '#6e4538', textShadow: '0 2px 16px rgba(110,69,56,0.12), 0 4px 28px rgba(110,69,56,0.06)' }}>Seetha</p>
                  <div className="flex items-center justify-center gap-2.5 mb-1">
                    <div className="w-6 h-px" style={{ background: 'linear-gradient(to right, transparent, #b5796a)' }} />
                    <p className="font-body text-[11px] tracking-[0.25em] uppercase font-bold" style={{ color: '#a5766a', letterSpacing: '0.3em' }}>with love</p>
                    <div className="w-6 h-px" style={{ background: 'linear-gradient(to left, transparent, #b5796a)' }} />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(255,200,180,0.1) 0%, transparent 100%)' }} />
            </div>

            <div
              className="absolute -inset-8 rounded-[2.5rem] -z-10 blur-3xl group-hover:blur-[60px] transition-all duration-700 animate-scale-breathe"
              style={{ background: 'radial-gradient(ellipse, rgba(220,150,120,0.35) 0%, rgba(230,170,140,0.2) 40%, transparent 70%)' }}
            />
            <div
              className="absolute -inset-12 rounded-[3rem] -z-20 blur-[80px] opacity-60"
              style={{ background: 'radial-gradient(circle, rgba(255,190,160,0.2) 0%, transparent 60%)' }}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3">
          <div
            className="relative w-11 h-11 rounded-full flex items-center justify-center animate-bounce-gentle group-hover:scale-110 transition-transform"
            style={{
              border: '2px solid rgba(150,110,90,0.3)',
              background: 'linear-gradient(135deg, rgba(255,245,235,0.8) 0%, rgba(255,230,210,0.5) 100%)',
              boxShadow: '0 4px 16px rgba(150,110,90,0.12), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            <div className="absolute inset-0 rounded-full animate-ring-expand opacity-30" style={{ border: '1px solid rgba(150,110,90,0.4)' }} />
            <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="#8a6a5a" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="font-body text-[11px] tracking-[0.25em] uppercase font-bold animate-pulse-soft" style={{ color: '#9a7a68', letterSpacing: '0.3em' }}>
            tap to open
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 flex items-center gap-2 animate-fade-in-slow opacity-40" style={{ color: '#9a7a68' }}>
        <Heart className="w-2.5 h-2.5" fill="currentColor" />
        <span className="font-body text-[9px] tracking-widest uppercase">made with love</span>
        <Heart className="w-2.5 h-2.5" fill="currentColor" />
      </div>
    </div>
  );
}
