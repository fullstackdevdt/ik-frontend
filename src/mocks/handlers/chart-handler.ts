import { http, HttpResponse } from 'msw';
import { HistoricalBar } from '../../dashboard/models/dashboard.models';

const BASE_URL = 'http://127.0.0.1:8000';

const COUNT = 33;

function generateMockBars(count: number): HistoricalBar[] {
  const bars: HistoricalBar[] = [];
  let basePrice = 150 + Math.random() * 10;
  const startDate = new Date('2024-01-01');

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const open = +(basePrice + (Math.random() - 0.5) * 4).toFixed(2);
    const close = +(open + (Math.random() - 0.5) * 4).toFixed(2);
    const high = +(Math.max(open, close) + Math.random() * 2).toFixed(2);
    const low = +(Math.min(open, close) - Math.random() * 2).toFixed(2);
    const volume = Math.floor(50_000_000 + Math.random() * 50_000_000);

    bars.push({ date: date.toISOString().slice(0, 10), open, high, low, close, volume });
    basePrice = close;
  }

  return bars;
}

const mockBars: HistoricalBar[] = generateMockBars(COUNT);

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