import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),provideRouter(routes), importProvidersFrom(AngularFireModule.initializeApp({"projectId":"foci-ng","appId":"1:680752297837:web:004b5cfcb9f9f338efcc64","storageBucket":"foci-ng.appspot.com","apiKey":"AIzaSyB3xxSCEKiaPQ6CVt_u_jpmpj58JoCiSzU","authDomain":"foci-ng.firebaseapp.com","messagingSenderId":"680752297837","measurementId":"G-0Q94S034BE"})), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage()))]
};
