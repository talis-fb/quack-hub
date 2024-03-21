import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';

import * as admin from 'firebase-admin';
import { FirebaseConfig } from 'src/config/firebase-config';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): admin.app.App => {
    const firebaseConfig = configService.get<FirebaseConfig>(
      'firebase',
    ) as admin.ServiceAccount;

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
