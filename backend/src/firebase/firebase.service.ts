import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
  ) {}

  public async getAllUsers() {
    try {
      const userRecords = await this.firebaseApp.auth().listUsers();

      console.log(userRecords);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
