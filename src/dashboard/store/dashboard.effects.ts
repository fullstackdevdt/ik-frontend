import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DashboardActions } from './dashboard.actions';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class DashboardEffects {
  private readonly actions$ = inject(Actions);
  private readonly dashboardService = inject(DashboardService);

  readonly loadChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadChart),
      exhaustMap(({ fileId }) =>
        this.dashboardService.loadChart(fileId).pipe(
          map(({ chartData, metadata }) =>
            DashboardActions.loadChartSuccess({ chartData, metadata })
          ),
          catchError((err) => {
            const message =
              err?.error?.error ??
              err?.error?.message ??
              err?.message ??
              'Failed to load chart';
            return of(DashboardActions.loadChartFailure({ error: message }));
          })
        )
      )
    )
  );
}