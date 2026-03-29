import { motion } from 'framer-motion';

export default function TrustSection() {
  const trustItems = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'ללא התחייבות',
      description: 'שיחה חופשית ללא כל התחייבות או עלות',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'פרטיות מלאה',
      description: 'המידע שלכם נשמר באופן מאובטח לחלוטין',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'מתאים לכולם',
      description: 'פתרונות חיסכון מותאמים לכל שלב בחיים',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'ייעוץ אישי בוואטסאפ',
      description: 'תשובות מהירות ותכנון מותאם בוואטסאפ',
    },
  ];

  const processSteps = [
    { num: '1', title: 'חשבו', desc: 'השתמשו במחשבון החינמי', icon: '🔢' },
    { num: '2', title: 'שלחו', desc: 'שתפו את התוצאות בוואטסאפ', icon: '💬' },
    { num: '3', title: 'קבלו', desc: 'קבלו תכנית מותאמת אישית', icon: '📋' },
  ];

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface-primary">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
            למה דיקלה?
          </h2>
          <p className="text-lg text-secondary max-w-xl mx-auto">
            ביטוח ופיננסים בהתאמה אישית – ללא לחץ, שקוף וכנה
          </p>
        </motion.div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-primary mb-8">איך זה עובד?</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {processSteps.map((step, index) => (
              <div key={step.num} className="flex flex-col items-center">
                <div className="flex items-center gap-4 md:flex-col md:gap-3">
                  <div className="w-14 h-14 rounded-full bg-primary-50 border-2 border-primary-200 flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <div className="md:text-center">
                    <div className="font-bold text-primary text-lg">{step.title}</div>
                    <div className="text-sm text-secondary">{step.desc}</div>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block w-16 h-0.5 border-t-2 border-dashed border-default absolute" style={{ transform: 'translateX(100px)' }} />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
