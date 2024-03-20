import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

export abstract class UserRepository {
    abstract create(data: any): Promise<any>;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(private prisma: PrismaService) {}

    create(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}