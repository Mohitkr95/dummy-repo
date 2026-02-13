import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
  sway: boolean;
}

const heartColors = [
  '#e8b4a2', '#dba898', '#c9978a', '#f0c4b0',
  '#d4a594', '#ecc8b8', '#c2897a', '#f5d5c8',
];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generated: FloatingHeart[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 18 + 8,
      delay: Math.random() * 12,
      duration: Math.random() * 8 + 10,
      opacity: Math.random() * 0.18 + 0.06,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      sway: Math.random() > 0.5,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={heart.sway ? 'absolute animate-float-up-sway' : 'absolute animate-float-up'}
          style={{
            left: `${heart.x}%`,
            bottom: '-10%',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            ['--heart-opacity' as string]: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            style={{ filter: `drop-shadow(0 0 ${heart.size / 3}px ${heart.color}40)` }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
