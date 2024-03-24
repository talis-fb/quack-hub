import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UserData, UserEntity } from 'src/core/user/user.entity';

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

  public async createUser(email: string, password: string): Promise<void> {
    // TODO: O próprio firebase tem sua restrição de quantos caracteres uma password tem que ter. Se no nosos backend tiver restrição de no mínimo 5 caracteres, dará erro pois por default no firebase é 6. Ver como resolver isso.
    // link1: https://stackoverflow.com/questions/55223217/firebase-auth-set-custom-expiration-time-for-custom-token
    // link2: https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=pt-br#create_custom_tokens_using_a_third-party_jwt_library
    await this.firebaseApp.auth().createUser({
      email,
      password,
    });
  }

  public async verifyToken(uid: string): Promise<DecodedIdToken> {
    return this.firebaseApp.auth().verifyIdToken(uid);
  }
}
