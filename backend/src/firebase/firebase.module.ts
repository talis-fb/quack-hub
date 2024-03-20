import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';

import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): admin.app.App => {
    const firebaseConfig = {
      type: configService.get<string>('TYPE'),
      project_id: configService.get<string>('PROJECT_ID'),
      private_key_id: configService.get<string>('PRIVATE_KEY_ID'),
      private_key: configService.get<string>('PRIVATE_KEY'),
      client_email: configService.get<string>('CLIENT_EMAIL'),
      client_id: configService.get<string>('CLIENT_ID'),
      auth_uri: configService.get<string>('AUTH_URI'),
      token_uri: configService.get<string>('TOKEN_URI'),
      auth_provider_x509_cert_url: configService.get<string>('AUTH_CERT_URL'),
      client_x509_cert_url: configService.get<string>('CLIENT_CERT_URL'),
      universe_domain: configService.get<string>('UNIVERSAL_DOMAIN'),
    } as admin.ServiceAccount;

    const firebaseApp: admin.app.App = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });

    return firebaseApp;
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
