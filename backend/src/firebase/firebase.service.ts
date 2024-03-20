import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
  ) {
    
  }
}
