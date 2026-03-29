import { motion } from 'framer-motion';

interface HeroSectionProps {
  onStartCalculation: () => void;
}

export default function HeroSection({ onStartCalculation }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden mesh-bg">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <img src="/logo.png" alt="דיקלה - ביטוח ופיננסים בהתאמה אישית" className="h-40 sm:h-52 mx-auto" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-display-sm md:text-display-md lg:text-display text-primary mb-6 leading-tight"
        >
          תכנון נכון היום.
          <br />
          <span className="gradient-text">שקט נפשי כלכלי מחר.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg sm:text-xl text-secondary max-w-xl mx-auto mb-10 font-medium leading-relaxed"
        >
          כמה זה יכול להיות שווה לכם? בדקו עכשיו –
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={onStartCalculation}
            className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-white rounded-3xl shadow-accent hover:shadow-lg transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent-200"
            style={{ background: 'var(--gradient-cta)' }}
          >
            בואו נחשב ביחד
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-4 sm:gap-6 text-sm text-tertiary flex-wrap"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            ללא התחייבות
          </span>
          <span className="text-tertiary">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            תוצאה מיידית
          </span>
          <span className="text-tertiary">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            שיחה בוואטסאפ
          </span>
        </motion.div>

        {/* Floating Preview Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="hidden md:block absolute -bottom-4 -left-8 lg:left-0 animate-float"
        >
          <div className="glass rounded-2xl px-6 py-4 shadow-soft-2">
            <div className="text-xs text-secondary mb-1">סכום משוער</div>
            <div className="text-2xl font-bold font-mono text-primary-600">₪252,000</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle"
      >
        <svg className="w-6 h-6 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
