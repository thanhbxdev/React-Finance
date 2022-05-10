interface AnalyticItem {
  estimate: number;
  reality: number;
  difference: number;
  percent: number | null;
}

export interface Analytic {
  income: AnalyticItem;
  expense: AnalyticItem;
}
