import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div className="text-center mb-8">
            <img src="/logo.png" alt="דיקלה" className="h-14 mx-auto mb-4 brightness-0 invert opacity-90" />
            <p className="text-white/50 text-sm">ביטוח ופיננסים בהתאמה אישית</p>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-8" />

          {/* Disclaimer */}
          <div className="bg-white/5 rounded-xl p-5 mb-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-white/40 leading-relaxed">
                המידע באתר זה אינו מהווה ייעוץ פיננסי, ייעוץ השקעות או המלצה מכל סוג שהוא.
                כל הנתונים והחישובים המוצגים באתר הם להמחשה בלבד ואינם מהווים התחייבות או ערובה לתשואות עתידיות.
                תשואות עבר אינן מבטיחות תשואות עתידיות.
                לפני קבלת החלטות פיננסיות, יש להיוועץ עם יועץ פיננסי מורשה.
              </p>
            </div>
          </div>

          {/* Contact & Copyright */}
          <div className="text-center text-sm text-white/40 space-y-2">
            <p>050-4696668 · diklafinance@outlook.co.il</p>
            <p>&copy; {new Date().getFullYear()} דיקלה – ביטוח ופיננסים. כל הזכויות שמורות.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
