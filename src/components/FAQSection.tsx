import { motion } from 'framer-motion';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'האם זה עולה כסף?',
      answer: 'לא! השיחה והייעוץ הראשוני הם חינם לחלוטין וללא התחייבות. אנחנו רוצים לעזור לכם להבין את האפשרויות שלכם לפני שאתם מחליטים.',
    },
    {
      question: 'האם אני חייב להתחייב?',
      answer: 'בשום פנים ואופן! השיחה היא ללא התחייבות. תקבלו מידע, תבינו את האפשרויות, ורק אם תחליטו שזה מתאים לכם – נמשיך הלאה.',
    },
    {
      question: 'איך אתם מחשבים את התשואה?',
      answer: 'המחשבון משתמש בנוסחת ריבית דריבית עם הפקדות חודשיות. התשואות מבוססות על נתוני שוק היסטוריים ומהוות אומדן בלבד. המסלול השמרני (3%) כולל בעיקר אג"ח עם חשיפה קטנה למניות, המאוזן (5%) שילוב שווה, והצמיחה (7%) דגש על מניות. תשואות בפועל עשויות להשתנות.',
    },
    {
      question: 'מה ההבדל בין המסלולים?',
      answer: 'מסלול שמרני (3%) – בעיקר אג"ח ופיקדונות עם חשיפה מינימלית למניות, סיכון נמוך. מסלול מאוזן (5%) – שילוב של מניות ואג"ח, סיכון בינוני. מסלול צמיחה (7%) – דגש על מניות עם פוטנציאל תשואה גבוה יותר אך גם סיכון גבוה יותר.',
    },
    {
      question: 'האם אפשר לשנות סכום בעתיד?',
      answer: 'כן! רוב תוכניות החיסכון מאפשרות גמישות מלאה. תוכלו להעלות, להוריד או אפילו להפסיק זמנית את ההפקדות בהתאם למצבכם הכלכלי.',
    },
    {
      question: 'למי זה מתאים?',
      answer: 'המחשבון מתאים לכולם – רווקים, זוגות צעירים, משפחות, ופורשים. בין אם אתם חוסכים לטיול, דירה, לימודים, חתונה, או פשוט רוצים לבנות כרית ביטחון כלכלית – התכנון רלוונטי לכל מטרה.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface-secondary">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
            שאלות נפוצות
          </h2>
          <p className="text-lg text-secondary">
            תשובות מהירות לשאלות שכולם שואלים
          </p>
        </motion.div>

        <div className="divide-y divide-default">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-5 transition-colors duration-150 group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary text-right flex-1 group-hover:text-primary-600 transition-colors">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 mr-4">
                    <svg
                      className={`w-5 h-5 text-tertiary transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-secondary text-right mt-3 leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-secondary">
            יש לכם שאלה נוספת? נשמח לענות בוואטסאפ
          </p>
        </motion.div>
      </div>
    </section>
  );
}
