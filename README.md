# מתכנן חיסכון לילדים 💰

Landing page חד עמודי בעברית (RTL) לשירות פינטק חיסכון עבור ילדים.

## תכונות עיקריות

- 🇮🇱 **ממשק מלא בעברית** עם תמיכה מלאה ב-RTL
- 📱 **Mobile-first design** - מותאם למובייל קודם כל
- 🎨 **עיצוב פינטק פרמיום** - נקי, מודרני ואמין
- 📊 **מחשבון חיסכון אינטראקטיבי** - תוצאות בזמן אמת
- 📈 **גרפים ויזואליים** - תצוגת צמיחת חיסכון לאורך זמן
- 🔥 **FOMO comparison** - השוואת תרחישי דחייה
- 💬 **המרה דרך WhatsApp** - CTA ישיר לוואטסאפ עם מסר מוכן

## טכנולוגיות

- **React 18** + **TypeScript**
- **Vite** - בילד מהיר וחווית פיתוח מעולה
- **TailwindCSS** - עיצוב מותאם אישית
- **Framer Motion** - אנימציות חלקות
- **Recharts** - גרפים ותרשימים

## התקנה

```bash
npm install
```

## הרצה במצב פיתוח

```bash
npm run dev
```

האתר יהיה זמין בכתובת: `http://localhost:5173`

## בנייה לפרודקשן

```bash
npm run build
```

הקבצים הסטטיים ייווצרו בתיקיית `dist/`.

## תצוגה מקדימה של גרסת פרודקשן

```bash
npm run preview
```

## התאמה אישית

### עדכון מספר WhatsApp

ערכו את המשתנה `WHATSAPP_PHONE` בקבצים:
- `src/components/WhatsAppCTA.tsx`
- `src/components/StickyWhatsAppBar.tsx`

פורמט: `972501234567` (ללא סימני + או רווחים)

### התאמת שיעורי תשואה

ניתן לשנות את שיעורי התשואה המשוערים בקובץ:
- `src/utils.ts` - במשתנה `RETURN_RATES`

### עיצוב וצבעים

ניתן להתאים את צבעי העיצוב בקובץ:
- `tailwind.config.js` - במפתח `theme.extend.colors`

## מבנה הפרויקט

```
src/
├── components/           # כל הקומפוננטות
│   ├── HeroSection.tsx
│   ├── OptionsSelector.tsx
│   ├── ResultsPanel.tsx
│   ├── FomoComparison.tsx
│   ├── WhatsAppCTA.tsx
│   ├── StickyWhatsAppBar.tsx
│   ├── TrustSection.tsx
│   ├── FAQSection.tsx
│   └── Footer.tsx
├── App.tsx              # קומפוננטת ראשית
├── utils.ts             # פונקציות חישוב ועזר
├── index.css            # סגנונות גלובליים
└── main.tsx             # נקודת כניסה
```

## רישיון

פרויקט זה נבנה למטרות הדגמה. ניתן להשתמש בו בחופשיות.

## הצהרת אחריות

המידע באתר אינו מהווה ייעוץ פיננסי או המלצה להשקעה. הנתונים להמחשה בלבד.
