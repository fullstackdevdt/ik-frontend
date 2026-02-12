import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dashboardFeature } from '../dashboard/store/dashboard.reducer';
import { DashboardEffects } from '../dashboard/store/dashboard.effects';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ [dashboardFeature.name]: dashboardFeature.reducer }),
    provideEffects([DashboardEffects]),
  ],
};