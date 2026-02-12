import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { DashboardActions } from './store/dashboard.actions';
import { selectDashboardViewModel } from './store/dashboard.selectors';
import { ChartData } from './models/dashboard.models';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();
  private chart: Chart | null = null;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  readonly initialFileId = input<string>('', { alias: 'fileId' });

  readonly fileIdControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  readonly vm$ = this.store.select(selectDashboardViewModel);

  ngOnInit(): void {
    const prefilledId = this.initialFileId();
    if (prefilledId) {
      this.fileIdControl.setValue(prefilledId);
    }
  }

  ngAfterViewInit(): void {
    this.vm$.pipe(takeUntil(this.destroy$)).subscribe((vm) => {
      if (vm.chartData && vm.chartData.labels.length > 0) {
        // Use setTimeout to ensure canvas is rendered after class toggle
        setTimeout(() => this.renderChart(vm.chartData!));
      } else {
        this.destroyChart();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyChart();
  }

  onLoadChart(): void {
    if (this.fileIdControl.invalid) {
      this.fileIdControl.markAsTouched();
      return;
    }
    const fileId = this.fileIdControl.getRawValue().trim();
    this.store.dispatch(DashboardActions.loadChart({ fileId }));
  }

  onReset(): void {
    this.fileIdControl.reset();
    this.store.dispatch(DashboardActions.reset());
  }

  private renderChart(data: ChartData): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    this.destroyChart();

    const colors: Record<string, string> = {
      Open: '#1a73e8',
      High: '#34a853',
      Low: '#ea4335',
      Close: '#fbbc04',
    };

    // For large datasets, simplify labels to date only
    const labels = data.labels.map((l) => {
      const parts = l.split(' ');
      return data.labels.length > 60 ? parts[0] : l;
    });

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: data.datasets.map((ds) => ({
          label: ds.label,
          data: ds.data,
          borderColor: colors[ds.label] ?? '#999',
          backgroundColor: (colors[ds.label] ?? '#999') + '15',
          borderWidth: 1.5,
          pointRadius: data.labels.length > 50 ? 0 : 2,
          pointHoverRadius: 4,
          tension: 0.05,
          fill: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleFont: { size: 12 },
            bodyFont: { size: 11 },
            callbacks: {
              label: (ctx: any) =>
                `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            display: true,
            grid: { display: false },
            ticks: {
              maxTicksLimit: 15,
              maxRotation: 45,
              font: { size: 10 },
            },
          },
          y: {
            display: true,
            beginAtZero: false,
            grid: { color: '#f0f0f0' },
            ticks: {
              font: { size: 10 },
              callback: (value: string | number) =>
                typeof value === 'number' ? value.toFixed(2) : value,
            },
          },
        },
      },
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}