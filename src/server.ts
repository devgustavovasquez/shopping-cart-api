import express, { Application } from 'express';
import { Server } from 'http';

import { logger } from './logger';

export class SetupServer {
  private app: Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.server = new Server(this.app);
  }

  public async setupControllers(): Promise<void> {
    // Aqui você pode configurar os controladores da sua aplicação
    // Exemplo:
    // this.app.use('/api', myApiController);
  }

  public async start(port: number): Promise<void> {
    await this.setupControllers();

    return new Promise((resolve, reject) => {
      this.server
        .listen(port, () => {
          logger.info(`Server listening on port ${port}`);
          resolve();
        })
        .on('error', (err: Error) => {
          reject(err);
        });
    });
  }

  public async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((err?: Error) => {
        if (err) {
          reject(err);
        } else {
          logger.info('Server closed');
          resolve();
        }
      });
    });
  }
}
