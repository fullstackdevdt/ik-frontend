import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadHistoricalData,
  loadHistoricalDataSuccess,
  loadHistoricalDataFailure,
  HistoricalData,
} from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadHistoricalData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHistoricalData),
      switchMap(({ fileId }) =>
        this.http.get<HistoricalData>(`http://localhost:8000/json/load_historical/${fileId}`).pipe(
          map((data) => loadHistoricalDataSuccess({ data })),
          catchError((error) =>
            of(loadHistoricalDataFailure({ error: error.message || 'Failed to load data' }))
          )
        )
      )
    )
  );
}
