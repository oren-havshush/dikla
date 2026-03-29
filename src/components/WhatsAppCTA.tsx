import { motion } from 'framer-motion';
import { UserInputs, LABELS, formatCurrency, calculateFutureValue, RETURN_RATES, TRACK_COLORS } from '../utils';

interface WhatsAppCTAProps {
  inputs: UserInputs;
}

const WHATSAPP_PHONE = '9720504696668';

export default function WhatsAppCTA({ inputs }: WhatsAppCTAProps) {
  const annualRate = RETURN_RATES[inputs.riskProfile];
  const finalAmount = calculateFutureValue(inputs.monthlyAmount, inputs.initialDeposit, annualRate, inputs.years);

  const generateWhatsAppMessage = () => {
    const message = `שלום דיקלה, ביצעתי חישוב באתר ואני רוצה תכנון פיננסי.

הפקדה חודשית: ₪${formatCurrency(inputs.monthlyAmount)}
הפקדה חד פעמית: ₪${formatCurrency(inputs.initialDeposit)}
מסלול: ${LABELS.riskProfile[inputs.riskProfile]}
תקופה: ${inputs.years} שנים
סכום צפוי: ₪${formatCurrency(finalAmount)}

אשמח לשיחה קצרה בוואטסאפ`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface-secondary">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* CTA Card */}
          <div
            className="rounded-2xl p-8 md:p-12 shadow-soft-3 text-center"
            style={{ background: 'var(--gradient-accent)' }}
          >
            <div className="inline-block bg-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-white font-semibold text-sm">הצעד הבא</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              רוצים תכנית פיננסית
              <br />
              מותאמת אישית?
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
              שלחו את התוצאה בוואטסאפ לדיקלה ותקבלו השוואה מפורטת בין מסלולים
            </p>

            {/* Calculation Summary */}
            <div className="glass-on-dark rounded-xl p-5 mb-8 max-w-sm mx-auto">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-white/50 text-xs">הפקדה חודשית</div>
                  <div className="text-white font-bold font-mono">₪{formatCurrency(inputs.monthlyAmount)}</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs">מסלול</div>
                  <div className="text-white font-bold">{TRACK_COLORS[inputs.riskProfile].label}</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs">תקופה</div>
                  <div className="text-white font-bold font-mono">{inputs.years} שנים</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs">סכום צפוי</div>
                  <div className="text-white font-bold font-mono">₪{formatCurrency(finalAmount)}</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <motion.a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold bg-white text-primary-700 rounded-3xl shadow-soft-4 hover:shadow-lg transition-all duration-200 animate-pulse-ring"
            >
              <svg className="w-7 h-7 text-whatsapp" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              שלחו לדיקלה בוואטסאפ
            </motion.a>
          </div>

          {/* Benefits */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-secondary">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ללא עלות
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ללא התחייבות
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              תשובה תוך 24 שעות
            </span>
          </div>

          {/* What you'll get */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 card p-8"
          >
            <h3 className="text-lg font-bold text-primary mb-4">מה תקבלו בשיחה?</h3>
            <ul className="space-y-3 text-secondary">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                השוואה בין מסלולי חיסכון והשקעה מובילים
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                תכנון מותאם אישית למצב הפיננסי שלכם
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                המלצות לאופטימיזציה של התשואה והחיסכון במס
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
