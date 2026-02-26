import { http, HttpResponse } from 'msw';
import { HistoricalBar } from '../../dashboard/models/dashboard.models';

const BASE_URL = 'http://127.0.0.1:8000';

const mockBars: HistoricalBar[] = [
  { date: '2024-01-01', open: 150.25, high: 153.00, low: 149.50, close: 151.75, volume: 82000000 },
  { date: '2024-01-02', open: 152.10, high: 154.80, low: 148.90, close: 149.90, volume: 75000000 },
  { date: '2024-01-03', open: 149.80, high: 153.50, low: 149.00, close: 152.60, volume: 91000000 },
  { date: '2024-01-04', open: 153.40, high: 156.00, low: 152.80, close: 154.20, volume: 68000000 },
  { date: '2024-01-05', open: 155.00, high: 157.50, low: 154.50, close: 156.30, volume: 77000000 },
];

export const chartHandlers = [
  http.get(`${BASE_URL}/json/load_historical/:fileId`, ({ params }) => {
    const { fileId } = params;

    return HttpResponse.json({
      id: fileId as string,
      symbol: 'AAPL',
      duration: '1 M',
      bar_size: '1 day',
      data_points: mockBars.length,
      created_at: new Date().toISOString(),
      data: mockBars,
    });
  }),
];