import { PrismaClient } from '@prisma/client';

export class Database extends PrismaClient {
  constructor() {
    super({
      log: ['query'],
    });
  }

  async connect(): Promise<void> {
    console.log('Connecting to database...');
    await this.$connect();
  }
}
