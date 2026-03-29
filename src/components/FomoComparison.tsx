import { motion } from 'framer-motion';
import { UserInputs, calculateFutureValue, formatCurrency, RETURN_RATES } from '../utils';

interface FomoComparisonProps {
  inputs: UserInputs;
}

export default function FomoComparison({ inputs }: FomoComparisonProps) {
  const annualRate = RETURN_RATES[inputs.riskProfile];

  const startNow = calculateFutureValue(inputs.monthlyAmount, inputs.initialDeposit, annualRate, inputs.years);

  const delay3Years = inputs.years - 3 > 0
    ? calculateFutureValue(inputs.monthlyAmount, inputs.initialDeposit, annualRate, inputs.years - 3)
    : 0;

  const delay5Years = inputs.years - 5 > 0
    ? calculateFutureValue(inputs.monthlyAmount, inputs.initialDeposit, annualRate, inputs.years - 5)
    : 0;

  const loss3Years = startNow - delay3Years;
  const loss5Years = startNow - delay5Years;

  const totalMonthsDelayed3 = 3 * 12;
  const lossPerMonth3 = loss3Years / totalMonthsDelayed3;

  const scenarios = [
    {
      title: 'התחלה היום',
      amount: startNow,
      loss: 0,
      borderColor: '#10B981',
      bgColor: 'bg-success-50',
      lossColor: '',
      highlight: true,
    },
    {
      title: 'דחייה של 3 שנים',
      amount: delay3Years,
      loss: loss3Years,
      borderColor: '#F97316',
      bgColor: 'bg-accent-50',
      lossColor: 'text-accent-600',
      highlight: false,
      warning: inputs.years - 3 <= 0,
    },
    {
      title: 'דחייה של 5 שנים',
      amount: delay5Years,
      loss: loss5Years,
      borderColor: '#F43F5E',
      bgColor: 'bg-danger-50',
      lossColor: 'text-danger-500',
      highlight: false,
      warning: inputs.years - 5 <= 0,
    },
  ];

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface-primary">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-danger-50 rounded-full px-4 py-1.5 mb-4">
              <span className="text-danger-600 font-semibold text-xs uppercase tracking-wider">למה עכשיו?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
              מה המחיר של לחכות?
            </h2>
            <p className="text-lg text-secondary max-w-xl mx-auto">
              ההשפעה של דחיית ההשקעה על העתיד הפיננסי שלכם
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`card overflow-hidden ${scenario.highlight ? 'ring-2 ring-success-200' : ''}`}
                style={{ borderTop: `4px solid ${scenario.borderColor}` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-primary text-lg">{scenario.title}</h3>
                    {scenario.highlight && (
                      <span className="bg-success-100 text-success-700 text-xs font-bold px-3 py-1 rounded-full">מומלץ</span>
                    )}
                  </div>

                  {scenario.warning ? (
                    <div className="text-center py-4">
                      <div className="text-3xl mb-2">⚠️</div>
                      <p className="text-sm font-semibold text-secondary">
                        כבר מאוחר מדי לתקופה הזו
                        <br />
                        כדאי לבחור תקופה ארוכה יותר
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-primary font-mono">
                          ₪{formatCurrency(scenario.amount)}
                        </div>
                        <div className="text-sm text-tertiary mt-1">סכום צפוי</div>
                      </div>

                      {scenario.loss > 0 && (
                        <div className="pt-4 border-t border-default">
                          <div className={`text-xl font-bold ${scenario.lossColor} font-mono`}>
                            ₪{formatCurrency(scenario.loss)}-
                          </div>
                          <div className="text-xs text-tertiary mt-1">הפסד לעומת התחלה מיידית</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Loss Counter */}
          {loss3Years > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-danger-50 rounded-2xl p-8 border border-danger-200 text-center"
            >
              <div className="text-xl font-bold text-primary mb-4">
                דחייה של 3 שנים יכולה לעלות לכם כ־
                <span className="text-danger-500"> ₪{formatCurrency(loss3Years)}</span>
                בעתיד
              </div>

              <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-soft-1">
                <div className="text-sm text-secondary mb-1">כל חודש של דחייה שווה בערך:</div>
                <div className="text-3xl font-bold text-danger-500 font-mono">
                  ₪{formatCurrency(lossPerMonth3)}
                </div>
              </div>

              <div className="mt-6 text-secondary font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                הזמן עובד בעדכם – ככל שתתחילו מוקדם יותר, כך הכסף יעבוד יותר קשה עבורכם
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
