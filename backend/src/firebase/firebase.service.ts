import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
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

  public async createUser(user: UserData): Promise<void> {
    const { email, password } = user;

    // TODO: O próprio firebase tem sua restrição de quantos caracteres uma password tem que ter. Se no nosos backend tiver restrição de no mínimo 5 caracteres, dará erro pois por default no firebase é 6. Ver como resolver isso.
    await this.firebaseApp.auth().createUser({
      email,
      password,
    });
  }

  public async generateJwtToken(user: UserEntity) {
    return await this.firebaseApp.auth().createCustomToken(user.id);
  }
}
