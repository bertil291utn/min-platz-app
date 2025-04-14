export const dashboardData = {
  predictiveAnalysis: {
    seasonalForecast: 18500,
    growthTrend: '+12%',
    alerts: [
      { type: 'warning', message: 'Posible plaga en Bloque A' },
      { type: 'info', message: 'Optimización sugerida para ciclo de riego' }
    ],
    harvestOptimization: { currentEfficiency: 85, suggestedChanges: 'Adelantar cosecha 2 días' }
  },
  inventory: {
    lowStock: ['Fertilizante N-P-K', 'Fungicida orgánico'],
    wastageRate: '3.2%',
    nextDelivery: '2025-04-20',
    stockHealth: 78
  },
  qualityControl: {
    topVarieties: [
      { name: 'Freedom', score: 92 },
      { name: 'Explorer', score: 88 }
    ],
    healthIssues: 2,
    lastInspection: '2025-04-13'
  },
  harvestPlanning: {
    nextHarvest: '2025-04-18',
    estimatedYield: 2800,
    workersNeeded: 12,
    activeBlocks: ['B1', 'B3', 'B4']
  },
  reports: {
    available: ['Producción Mensual', 'Calidad por Variedad', 'Costos Operativos'],
    lastExport: '2025-04-12',
    yearComparison: '+15%'
  }
};

export const productionMetrics = {
  totalProduction: 15420,
  previousMonth: 14800,
  topVariety: "Freedom",
  topVarietyProduction: 3200,
  problemBlocks: ["Cama 13", "Cama 7"],
  monthlyRevenue: 45600,
  monthlyExpenses: 28900
};
