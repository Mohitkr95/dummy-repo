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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fff9f4 0%, #ffe8db 20%, #ffd9c8 40%, #ffe4d6 60%, #fff2eb 80%, #fff9f4 100%)' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(255,200,170,0.3) 0%, transparent 50%)' }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 70%, rgba(255,215,190,0.25) 0%, transparent 60%)' }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,230,210,0.15) 0%, transparent 70%)' }} />
      <div className="fixed inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(210,140,120,0.05) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(210,140,120,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

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
