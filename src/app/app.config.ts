import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
              provideRouter(routes),
              importProvidersFrom(
                AngularFireModule.initializeApp(environment)),
                  importProvidersFrom(provideAuth(() => getAuth())),
                  importProvidersFrom(provideFirestore(() => getFirestore())),
                  importProvidersFrom(provideStorage(() => getStorage()))]
};
