// User input state types
export interface UserInputs {
  monthlyAmount: number;
  riskProfile: 'conservative' | 'balanced' | 'growth';
  years: number;
  initialDeposit: number;
}

// Return rates for risk profiles (annual)
export const RETURN_RATES = {
  conservative: 0.03,
  balanced: 0.05,
  growth: 0.07,
};

// Track colors
export const TRACK_COLORS = {
  conservative: {
    bg: '#FEF3C7',       // amber-100
    border: '#F59E0B',   // amber-500
    text: '#B45309',     // amber-700
    fill: '#FBBF24',     // amber-400
    label: 'שמרני',
    rate: '3%',
    description: 'אג"ח ופיקדונות עם חשיפה קטנה למניות',
  },
  balanced: {
    bg: '#FFEDD5',       // orange-100
    border: '#F97316',   // orange-500
    text: '#C2410C',     // orange-700
    fill: '#FB923C',     // orange-400
    label: 'מאוזן',
    rate: '5%',
    description: 'שילוב מאוזן של מניות ואג"ח',
  },
  growth: {
    bg: '#FEE2E2',       // red-100
    border: '#EF4444',   // red-500
    text: '#B91C1C',     // red-700
    fill: '#F87171',     // red-400
    label: 'צמיחה',
    rate: '7%',
    description: 'דגש על מניות עם פוטנציאל תשואה גבוה',
  },
};

// Hebrew labels
export const LABELS = {
  riskProfile: {
    conservative: 'שמרני',
    balanced: 'מאוזן',
    growth: 'צמיחה',
  },
};

// Calculate compound interest with monthly compounding
export function calculateFutureValue(
  monthlyDeposit: number,
  initialDeposit: number,
  annualRate: number,
  years: number
): number {
  if (years <= 0) return initialDeposit;

  const monthlyRate = annualRate / 12;
  const months = years * 12;

  // Future value of initial deposit
  const fvInitial = initialDeposit * Math.pow(1 + monthlyRate, months);

  // Future value of monthly deposits (annuity)
  const fvMonthly = monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return fvInitial + fvMonthly;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function calculateTotalDeposits(
  monthlyDeposit: number,
  initialDeposit: number,
  years: number
): number {
  return initialDeposit + (monthlyDeposit * years * 12);
}
