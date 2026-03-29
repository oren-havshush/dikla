import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserInputs, calculateFutureValue, calculateTotalDeposits, formatCurrency, RETURN_RATES, TRACK_COLORS } from '../utils';
import { useEffect, useState } from 'react';

interface ResultsPanelProps {
  inputs: UserInputs;
  updateInput: <K extends keyof UserInputs>(key: K, value: UserInputs[K]) => void;
}

export default function ResultsPanel({ inputs, updateInput }: ResultsPanelProps) {
  const annualRate = RETURN_RATES[inputs.riskProfile];
  const finalAmount = calculateFutureValue(inputs.monthlyAmount, inputs.initialDeposit, annualRate, inputs.years);
  const totalDeposits = calculateTotalDeposits(inputs.monthlyAmount, inputs.initialDeposit, inputs.years);
  const expectedGrowth = finalAmount - totalDeposits;
  const trackColor = TRACK_COLORS[inputs.riskProfile];

  // Animated counter
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = finalAmount;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayAmount(end);
        clearInterval(timer);
      } else {
        setDisplayAmount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [finalAmount]);

  // Generate chart data
  const chartData = [];
  for (let year = 0; year <= inputs.years; year++) {
    chartData.push({
      year,
      amount: Math.round(calculateFutureValue(inputs.monthlyAmount, inputs.initialDeposit, annualRate, year)),
      deposits: calculateTotalDeposits(inputs.monthlyAmount, inputs.initialDeposit, year),
    });
  }

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface-secondary">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-primary-50 rounded-full px-4 py-1.5 mb-4">
              <span className="text-primary-600 font-semibold text-xs uppercase tracking-wider">התוצאות שלכם</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 leading-tight">
              אם תפקידו ₪{formatCurrency(inputs.monthlyAmount)} בחודש למשך {inputs.years} שנים
            </h2>
          </div>

          {/* Big Number Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-8 md:p-10 mb-6 shadow-soft-3 text-center"
            style={{ background: 'var(--gradient-accent)' }}
          >
            <div className="text-sm text-white/70 mb-2 font-medium">הסכום הצפוי שלכם</div>
            <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white font-mono font-tabular">
              ₪{formatCurrency(displayAmount)}
            </div>
            <div className="text-sm text-white/60 mt-3">
              בעוד {inputs.years} שנים · מסלול {trackColor.label} ({trackColor.rate})
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card p-5"
            >
              <div className="text-sm text-secondary mb-1 font-medium">סך הפקדות</div>
              <div className="text-2xl md:text-3xl font-bold text-primary font-mono">₪{formatCurrency(totalDeposits)}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card p-5 border-r-4"
              style={{ borderRightColor: '#10B981' }}
            >
              <div className="text-sm text-secondary mb-1 font-medium">רווח צפוי</div>
              <div className="text-2xl md:text-3xl font-bold text-success-600 font-mono">₪{formatCurrency(expectedGrowth)}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card p-5 col-span-2 md:col-span-1"
            >
              <div className="text-sm text-secondary mb-1 font-medium">סכום עתידי</div>
              <div className="text-2xl md:text-3xl font-bold text-primary-600 font-mono">₪{formatCurrency(finalAmount)}</div>
            </motion.div>
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="card p-6 md:p-8 mb-8"
          >
            <h3 className="text-lg font-bold text-primary mb-6">גרף צמיחה לאורך זמן</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B5BF5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B5BF5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E4E0" strokeOpacity={0.5} vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="#8E8EA0"
                  tick={{ fontSize: 12 }}
                  label={{ value: 'שנים', position: 'insideBottom', offset: -5, style: { fontSize: 13, fill: '#8E8EA0' } }}
                />
                <YAxis
                  stroke="#8E8EA0"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₪${formatCurrency(value)}`}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `₪${formatCurrency(value)}`,
                    name === 'amount' ? 'סכום צפוי' : 'הפקדות בלבד',
                  ]}
                  labelFormatter={(label) => `שנה ${label}`}
                  contentStyle={{
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid #E5E4E0',
                    borderRadius: '12px',
                    direction: 'rtl',
                    boxShadow: '0 4px 16px rgba(26, 26, 46, 0.08)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#3B5BF5"
                  strokeWidth={2.5}
                  fill="url(#chartGradient)"
                  dot={{ fill: '#3B5BF5', r: 3 }}
                  activeDot={{ r: 6, fill: '#3B5BF5', stroke: '#fff', strokeWidth: 2 }}
                  name="amount"
                />
                <Area
                  type="monotone"
                  dataKey="deposits"
                  stroke="#8E8EA0"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  fill="none"
                  dot={false}
                  name="deposits"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full" />
                <span className="text-secondary">סכום כולל צפוי</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-tertiary" style={{ borderTop: '2px dashed #8E8EA0' }} />
                <span className="text-secondary">הפקדות בלבד</span>
              </div>
            </div>
          </motion.div>

          {/* Adjustment Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="card p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-primary mb-6">התאימו את התכנון</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">מספר שנים</label>
                <select
                  value={inputs.years}
                  onChange={(e) => updateInput('years', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-default focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 bg-white text-lg font-semibold font-mono"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((y) => (
                    <option key={y} value={y}>{y} שנים</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">הפקדה חד פעמית (אופציונלי)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.initialDeposit}
                    onChange={(e) => updateInput('initialDeposit', Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-default focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 bg-white text-lg font-semibold font-mono"
                    min="0"
                    step="1000"
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary font-semibold">₪</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
