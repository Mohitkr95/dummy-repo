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
      <div className="animate-fade-in-slow mb-12 text-center">
        <p className="font-body text-sm tracking-[0.3em] uppercase mb-2 animate-text-glow" style={{ color: '#8a6a5a' }}>
          a little something special
        </p>
        <p className="font-script text-2xl md:text-3xl tracking-wide animate-sway-gentle" style={{ color: '#7a5548' }}>
          14th February
        </p>
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

          <div className="relative w-72 h-48 md:w-[26rem] md:h-[17rem]">
            {showRings && (
              <>
                <div
                  className="absolute inset-0 rounded-3xl animate-ring-expand"
                  style={{ border: '1px solid rgba(200,160,140,0.2)' }}
                />
                <div
                  className="absolute inset-0 rounded-3xl animate-ring-expand"
                  style={{ border: '1px solid rgba(200,160,140,0.15)', animationDelay: '0.5s' }}
                />
              </>
            )}

            <div
              className="absolute inset-0 rounded-3xl overflow-hidden animate-envelope-hover"
              style={{
                background: 'linear-gradient(145deg, #fff9f5 0%, #fef0e8 30%, #fbe5da 70%, #f8ddd0 100%)',
                boxShadow: '0 20px 60px -15px rgba(160,110,85,0.25), 0 0 0 1px rgba(200,160,140,0.25)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px animate-shimmer" style={{ background: 'linear-gradient(to right, transparent, rgba(210,170,150,0.5), transparent, rgba(210,170,150,0.3), transparent)' }} />
              <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(190,150,130,0.3), transparent)' }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Gift className="w-11 h-11 animate-float-rotate group-hover:animate-wiggle" strokeWidth={1.5} style={{ color: '#9e6e5c' }} />
                    <Heart
                      className="absolute -top-1 -right-2 w-4 h-4 animate-heartbeat"
                      fill="#b5796a"
                      style={{ color: '#b5796a' }}
                    />
                    <div
                      className="absolute -top-3 -left-3 w-2 h-2 rounded-full animate-twinkle"
                      style={{ backgroundColor: '#d4a894', animationDelay: '0.5s' }}
                    />
                    <div
                      className="absolute -bottom-2 -right-3 w-1.5 h-1.5 rounded-full animate-twinkle"
                      style={{ backgroundColor: '#c9987e', animationDelay: '1.5s' }}
                    />
                  </div>
                  <p className="font-script text-3xl md:text-4xl mb-1.5 animate-text-glow" style={{ color: '#6e4538' }}>Seetha</p>
                  <p className="font-body text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: '#9a7568' }}>with love</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -inset-6 rounded-[2rem] -z-10 blur-2xl group-hover:blur-3xl transition-all duration-500 animate-scale-breathe"
              style={{ background: 'radial-gradient(ellipse, rgba(210,170,150,0.25) 0%, transparent 70%)' }}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center animate-bounce-gentle"
            style={{ border: '1.5px solid rgba(150,110,90,0.4)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#8a6a5a" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="font-body text-xs tracking-[0.2em] uppercase font-medium animate-pulse-soft" style={{ color: '#9a7a68' }}>
            tap to open
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 flex items-center gap-2.5 animate-fade-in-slow" style={{ color: '#b8978a' }}>
        <Heart className="w-3 h-3 animate-heartbeat" fill="currentColor" />
        <span className="font-body text-[10px] tracking-[0.25em] uppercase">made with love</span>
        <Heart className="w-3 h-3 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}
