import express, { Application } from 'express';
import { Server } from 'http';

import { logger } from '../../logger';
import { Database } from '../database';
import { CartsController } from './controllers/carts-controller';

export class SetupServer {
  private app: Application;
  private server: Server;
  private database: Database;

  constructor() {
    this.app = express();
    this.database = new Database();
    this.server = new Server(this.app);
  }

  private async setupControllers(): Promise<void> {
    const cartsController = new CartsController(this.database);
    this.app.post('/carts', cartsController.create);
    logger.info('[POST] /carts');
    this.app.put('/carts', cartsController.update);
    logger.info('[PUT] /carts');
    this.app.post('/carts/confirm', cartsController.confirmPurchase);
    logger.info('[POST] /carts/confirm');
    this.app.delete('/carts', cartsController.delete);
    logger.info('[DELETE] /carts');
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
