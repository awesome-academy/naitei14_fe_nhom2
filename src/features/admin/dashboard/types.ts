export interface SalesRecord {
  date: string;
  total: number;
}

export interface TopProduct {
  id: number;
  name: string;
  sales: number;
}

export interface DashboardOverview {
  totalSales: number;
  orders: number;
  users: number;
}

export interface DashboardData {
  sales: SalesRecord[];
  topProducts: TopProduct[];
  overview: DashboardOverview;
}