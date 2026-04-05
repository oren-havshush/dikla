import { motion } from 'framer-motion';
import { UserInputs, TRACK_COLORS } from '../utils';
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { calculateFutureValue, calculateTotalDeposits, RETURN_RATES, formatCurrency } from '../utils';

interface OptionsSelectorProps {
  inputs: UserInputs;
  updateInput: <K extends keyof UserInputs>(key: K, value: UserInputs[K]) => void;
}

export default function OptionsSelector({ inputs, updateInput }: OptionsSelectorProps) {
  const sliderPercent = ((inputs.monthlyAmount - 100) / (10000 - 100)) * 100;

  // Mini chart data for preview
  const miniChartData = useMemo(() => {
    const rate = RETURN_RATES[inputs.riskProfile];
    const data = [];
    for (let y = 0; y <= inputs.years; y++) {
      data.push({
        year: y,
        amount: Math.round(calculateFutureValue(inputs.monthlyAmount, inputs.initialDeposit, rate, y)),
        deposits: calculateTotalDeposits(inputs.monthlyAmount, inputs.initialDeposit, y),
      });
    }
    return data;
  }, [inputs.monthlyAmount, inputs.initialDeposit, inputs.riskProfile, inputs.years]);

  const estimatedResult = useMemo(() => {
    const rate = RETURN_RATES[inputs.riskProfile];
    return calculateFutureValue(inputs.monthlyAmount, inputs.initialDeposit, rate, inputs.years);
  }, [inputs.monthlyAmount, inputs.initialDeposit, inputs.riskProfile, inputs.years]);

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface-primary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Contribution Setup */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">כמה תרצו להפקיד?</h3>
            <p className="text-secondary text-sm mb-6">אפשר לשלב הפקדה חודשית עם הפקדה חד פעמית</p>

            <div className="card p-8 hover:transform-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">הפקדה חודשית</label>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-bold text-secondary">₪</span>
                    <input
                      type="number"
                      value={inputs.monthlyAmount}
                      onChange={(e) => {
                        const val = Math.max(100, Math.min(10000, Number(e.target.value)));
                        updateInput('monthlyAmount', val);
                      }}
                      className="w-36 text-4xl font-extrabold text-primary-600 bg-transparent text-center focus:outline-none focus:ring-0 border-b-2 border-transparent focus:border-primary-300 font-mono"
                      min="100"
                      max="10000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">הפקדה חד פעמית (אופציונלי)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.initialDeposit}
                      onChange={(e) => updateInput('initialDeposit', Number(e.target.value))}
                      className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-default focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 bg-white text-lg font-semibold font-mono"
                      min="0"
                      step="1000"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary font-semibold">₪</span>
                  </div>
                </div>
              </div>

              {/* Premium Slider */}
              <div className="relative">
                <input
                  type="range"
                  value={inputs.monthlyAmount}
                  onChange={(e) => updateInput('monthlyAmount', Number(e.target.value))}
                  min="100"
                  max="10000"
                  step="50"
                  className="premium-slider"
                  style={{
                    background: `linear-gradient(to left, #3B5BF5 0%, #6080FA ${sliderPercent}%, #EDECE8 ${sliderPercent}%)`,
                  }}
                />
              </div>

              {/* Preset Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {[250, 500, 1000, 2000, 5000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => updateInput('monthlyAmount', amount)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                      inputs.monthlyAmount === amount
                        ? 'bg-primary-500 text-white shadow-primary-glow'
                        : 'bg-surface-secondary text-secondary hover:bg-surface-tertiary border border-default'
                    }`}
                  >
                    ₪{formatCurrency(amount)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Years Selector */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">מתי תרצו להשתמש בכסף?</h3>
            <p className="text-secondary text-sm mb-6">בחרו את מספר השנים</p>

            <div className="card p-8 hover:transform-none">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-4xl font-extrabold text-primary-600 font-mono">{inputs.years}</span>
                <span className="text-xl font-bold text-secondary">שנים</span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  value={inputs.years}
                  onChange={(e) => updateInput('years', Number(e.target.value))}
                  min="1"
                  max="30"
                  step="1"
                  className="premium-slider"
                  style={{
                    background: `linear-gradient(to left, #3B5BF5 0%, #6080FA ${((inputs.years - 1) / 29) * 100}%, #EDECE8 ${((inputs.years - 1) / 29) * 100}%)`,
                  }}
                />
              </div>

              <div className="flex justify-between text-xs text-tertiary mt-2 px-1">
                <span>שנה</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>

              {/* Quick picks */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {[3, 5, 10, 15, 20, 25].map((y) => (
                  <button
                    key={y}
                    onClick={() => updateInput('years', y)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                      inputs.years === y
                        ? 'bg-primary-500 text-white shadow-primary-glow'
                        : 'bg-surface-secondary text-secondary hover:bg-surface-tertiary border border-default'
                    }`}
                  >
                    {y} שנים
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Profile */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">איזה מסלול השקעה מתאים לכם?</h3>
            <p className="text-secondary text-sm mb-6">בחרו את רמת הסיכון המועדפת</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(Object.keys(TRACK_COLORS) as Array<keyof typeof TRACK_COLORS>).map((risk) => {
                const track = TRACK_COLORS[risk];
                const isSelected = inputs.riskProfile === risk;

                return (
                  <button
                    key={risk}
                    onClick={() => updateInput('riskProfile', risk)}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-right ${
                      isSelected
                        ? 'shadow-soft-2 scale-[1.02]'
                        : 'border-default bg-surface-primary hover:shadow-soft-1 hover:border-hover'
                    }`}
                    style={{
                      borderColor: isSelected ? track.border : undefined,
                      backgroundColor: isSelected ? track.bg : undefined,
                    }}
                  >
                    {/* Color indicator */}
                    <div
                      className="w-3 h-3 rounded-full mb-3"
                      style={{ backgroundColor: track.border }}
                    />

                    <div className="text-lg font-bold mb-1" style={{ color: isSelected ? track.text : '#1A1A2E' }}>
                      {track.label}
                    </div>
                    <div className="text-sm mb-2" style={{ color: isSelected ? track.text : '#5A5A72' }}>
                      תשואה צפויה: {track.rate} בשנה
                    </div>
                    <div className="text-xs" style={{ color: '#8E8EA0' }}>
                      {track.description}
                    </div>

                    {/* Risk level bar */}
                    <div className="mt-4 h-1.5 rounded-full bg-surface-tertiary overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: risk === 'conservative' ? '30%' : risk === 'balanced' ? '60%' : '90%',
                          backgroundColor: track.border,
                        }}
                      />
                    </div>

                    {isSelected && (
                      <div className="absolute top-3 left-3">
                        <svg className="w-5 h-5" fill={track.border} viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview with Mini Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 md:p-8 shadow-soft-2"
            style={{ background: 'var(--gradient-accent)' }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Estimated Result */}
              <div className="text-center md:text-right flex-1">
                <div className="text-sm text-white/70 mb-1">סכום משוער</div>
                <div className="text-4xl md:text-5xl font-extrabold text-white font-mono">
                  ₪{formatCurrency(estimatedResult)}
                </div>
                <div className="text-sm text-white/60 mt-2">
                  בעוד {inputs.years} שנים · מסלול {TRACK_COLORS[inputs.riskProfile].label}
                </div>
              </div>

              {/* Mini Chart */}
              <div className="w-full md:w-64 h-32 glass-on-dark rounded-xl p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                    <defs>
                      <linearGradient id="miniGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      fill="url(#miniGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="deposits"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth={1}
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    <XAxis dataKey="year" hide />
                    <YAxis hide />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
