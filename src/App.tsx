import { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import Envelope from './components/Envelope';
import Birthday from './components/Birthday';
import Question from './components/Question';
import Celebration from './components/Celebration';
import ILoveYou from './components/ILoveYou';

type Stage = 'envelope' | 'birthday' | 'question' | 'celebration' | 'iloveyou';

function App() {
  const [stage, setStage] = useState<Stage>('envelope');
  const [transitioning, setTransitioning] = useState(false);

  const goTo = (next: Stage) => {
    setTransitioning(true);
    setTimeout(() => {
      setStage(next);
      setTransitioning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdf6f0 0%, #fef0e8 25%, #fdf2f0 50%, #f9ece6 75%, #fdf6f0 100%)' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top center, rgba(255,228,210,0.25) 0%, transparent 60%)' }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(255,218,200,0.15) 0%, transparent 50%)' }} />

      <FloatingHearts />

      <div className={`relative z-10 transition-all duration-600 ${transitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {stage === 'envelope' && (
          <Envelope onOpen={() => goTo('birthday')} />
        )}

        {stage === 'birthday' && (
          <Birthday onNext={() => goTo('question')} />
        )}

        {stage === 'question' && (
          <Question onYes={() => goTo('celebration')} />
        )}

        {stage === 'celebration' && (
          <Celebration onNext={() => goTo('iloveyou')} />
        )}

        {stage === 'iloveyou' && <ILoveYou />}
      </div>
    </div>
  );
}

export default App;
