import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

async function prepareApp(): Promise<void> {
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

prepareApp()
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));