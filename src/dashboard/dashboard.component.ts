import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadHistoricalData } from './dashboard.actions';
import {
  selectHistoricalData,
  selectHistoricalDataPoints,
  selectLoading,
  selectError,
} from './dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);

  historicalData$ = this.store.select(selectHistoricalData);
  dataPoints$ = this.store.select(selectHistoricalDataPoints);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  ngOnInit(): void {
    // Load data with a sample file ID - replace with your actual file ID 1764824458779   1764824399773
    this.store.dispatch(loadHistoricalData({ fileId: '1764824399773' }));
  }

  loadData(fileId: string): void {
    this.store.dispatch(loadHistoricalData({ fileId }));
  }
}
