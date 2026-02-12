import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ChartData, ChartMetadata, HistoricalBar } from '../models/dashboard.models';

interface HistoricalResponse {
  id: string;
  symbol: string;
  duration: string;
  bar_size: string;
  data_points: number;
  created_at: string;
  data: HistoricalBar[];
}

export interface ChartDataWithMetadata {
  chartData: ChartData;
  metadata: ChartMetadata;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://127.0.0.1:8000';

  loadChart(fileId: string): Observable<ChartDataWithMetadata> {
    return this.http
      .get<HistoricalResponse>(
        `${this.baseUrl}/json/load_historical/${encodeURIComponent(fileId)}`
      )
      .pipe(
        map((response) => ({
          chartData: this.transformBars(response.data),
          metadata: {
            id: response.id,
            symbol: response.symbol,
            duration: response.duration,
            barSize: response.bar_size,
            dataPoints: response.data_points,
            createdAt: response.created_at,
          },
        }))
      );
  }

  private transformBars(bars: HistoricalBar[]): ChartData {
    if (!bars?.length) {
      return { labels: [], datasets: [] };
    }

    const labels = bars.map((b) => b.date);

    return {
      labels,
      datasets: [
        { label: 'Open', data: bars.map((b) => b.open) },
        { label: 'High', data: bars.map((b) => b.high) },
        { label: 'Low', data: bars.map((b) => b.low) },
        { label: 'Close', data: bars.map((b) => b.close) },
      ],
    };
  }
}