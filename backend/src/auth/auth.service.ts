import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async signIn(email: string, password: string): Promise<any> {
        return "a";
    }
}
