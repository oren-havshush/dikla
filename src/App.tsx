import { useState, useRef } from 'react';
import { UserInputs } from './utils';
import HeroSection from './components/HeroSection';
import OptionsSelector from './components/OptionsSelector';
import ResultsPanel from './components/ResultsPanel';
import FomoComparison from './components/FomoComparison';
import WhatsAppCTA from './components/WhatsAppCTA';
import TrustSection from './components/TrustSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import StickyWhatsAppBar from './components/StickyWhatsAppBar';

function App() {
  const [inputs, setInputs] = useState<UserInputs>({
    monthlyAmount: 500,
    riskProfile: 'balanced',
    years: 10,
    initialDeposit: 0,
  });

  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleStartCalculation = () => {
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const updateInput = <K extends keyof UserInputs>(key: K, value: UserInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <HeroSection onStartCalculation={handleStartCalculation} />

      {showResults && (
        <>
          <div ref={resultsRef}>
            <OptionsSelector inputs={inputs} updateInput={updateInput} />
          </div>

          <ResultsPanel inputs={inputs} updateInput={updateInput} />

          <FomoComparison inputs={inputs} />

          <WhatsAppCTA inputs={inputs} />

          <TrustSection />

          <FAQSection />
        </>
      )}

      <Footer />

      {showResults && <StickyWhatsAppBar inputs={inputs} />}
    </div>
  );
}

export default App;
