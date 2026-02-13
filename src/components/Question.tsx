import { useState, useRef, useCallback, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface QuestionProps {
  onYes: () => void;
}

const noMessages = [
  'No',
  'Are you sure?',
  'Really sure?',
  'Think again!',
  'Pretty please?',
  'With a cherry on top?',
  'You are breaking my heart :(',
  'I am gonna cry...',
  'You are so mean!',
  'PLEASE!!!',
  'I will be so sad...',
  'Okay I am crying now',
  'Fine... I will just keep asking',
  'Nooo don\'t click me!',
  'I won\'t give up!',
  'You can\'t escape love!',
  'Just look at the other button...',
  'I believe in us!',
  'My heart is breaking...',
  'You really wanna say no?!',
];

export default function Question({ onYes }: QuestionProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noMoves, setNoMoves] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [noShrink, setNoShrink] = useState(1);
  const [loveFloats, setLoveFloats] = useState<{ id: number; x: number; delay: number }[]>([]);
  const [sparklePositions] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 12 + 8,
    }))
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const moveNoButton = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const padding = 80;
    const maxX = (rect.width / 2) - padding;
    const maxY = (rect.height / 2) - padding;

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    const newX = Math.cos(angle) * Math.min(distance, maxX);
    const newY = Math.sin(angle) * Math.min(distance, maxY);

    setNoPosition({ x: newX, y: newY });
    setNoMoves((prev) => prev + 1);
    setNoShrink((prev) => Math.max(prev - 0.03, 0.5));

    setLoveFloats((prev) => [
      ...prev.slice(-5),
      { id: Date.now(), x: newX, delay: 0 },
    ]);
  }, []);

  const yesScale = 1 + noMoves * 0.06;
  const currentMessage = noMessages[noMoves % noMessages.length];

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center min-h-screen px-6 transition-all duration-700 relative ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparklePositions.map((s) => (
          <div
            key={s.id}
            className="absolute animate-twinkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              animationDelay: `${s.delay}s`,
            }}
          >
            <Sparkles style={{ color: '#d4a894', width: s.size, height: s.size }} />
          </div>
        ))}
      </div>

      <div className="mb-6 relative">
        <Heart
          className="w-14 h-14 md:w-16 md:h-16 animate-heartbeat"
          fill="#b87a68"
          style={{ color: '#b87a68', filter: 'drop-shadow(0 0 18px rgba(180,110,90,0.3))' }}
        />
        <div className="absolute inset-0 animate-ring-expand rounded-full" style={{ border: '2px solid rgba(180,110,90,0.2)' }} />
        <div className="absolute inset-0 animate-ring-expand rounded-full" style={{ border: '2px solid rgba(180,110,90,0.15)', animationDelay: '0.75s' }} />
      </div>

      <h1 className="font-script text-4xl md:text-6xl lg:text-7xl mb-3 text-center leading-tight animate-fade-in-up animate-text-glow" style={{ color: '#5e3828' }}>
        Dear Seetha,
      </h1>

      <p className="font-script text-2xl md:text-4xl lg:text-5xl mb-4 text-center animate-fade-in-up-delay animate-sway-gentle" style={{ color: '#7a4e3e' }}>
        Will you be my constant?
      </p>

      <p className="font-body text-xs tracking-[0.2em] mb-12 animate-fade-in-up-delay font-medium" style={{ color: '#8a6a5a' }}>
        {'{ the one variable that never changes }'}
      </p>

      <div className="relative flex flex-col items-center gap-8" style={{ minHeight: '250px', width: '100%', maxWidth: '600px' }}>
        <button
          onClick={onYes}
          className="relative px-14 py-4 rounded-full font-body font-semibold text-lg md:text-xl active:scale-95 transition-all duration-300 z-10 group overflow-hidden animate-glow-pulse"
          style={{
            transform: `scale(${Math.min(yesScale, 2.2)})`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(135deg, #9e6e5c, #8a5e4e, #9e6e5c)' }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, #8a5e4e, #7a5040, #8a5e4e)' }}
          />
          <span className="relative z-10 text-white flex items-center gap-2.5">
            Yes
            <Heart className="w-5 h-5 group-hover:animate-wiggle" fill="currentColor" />
          </span>
        </button>

        <div
          className="transition-all ease-out z-20"
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noShrink})`,
            transitionDuration: '400ms',
          }}
        >
          <button
            onMouseEnter={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            onClick={moveNoButton}
            className="px-8 py-3 font-body font-medium text-sm rounded-full shadow-sm transition-all duration-200 select-none whitespace-nowrap"
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(8px)',
              color: '#7a5548',
              border: '1px solid rgba(180,140,120,0.35)',
            }}
          >
            {currentMessage}
          </button>
        </div>

        {loveFloats.map((f) => (
          <div
            key={f.id}
            className="absolute top-1/2 left-1/2 animate-love-float pointer-events-none"
            style={{ transform: `translateX(${f.x * 0.3}px)` }}
          >
            <Heart className="w-4 h-4" fill="#b87a68" style={{ color: '#b87a68' }} />
          </div>
        ))}

        {noMoves >= 3 && (
          <p className="absolute -bottom-4 font-body text-xs animate-pulse-soft italic" style={{ color: '#9a7a68' }}>
            {noMoves >= 10
              ? '(the No button is crying in the corner)'
              : noMoves >= 6
                ? '(the No button is running for its life)'
                : '(the No button is scared of you)'}
          </p>
        )}
      </div>
    </div>
  );
}
