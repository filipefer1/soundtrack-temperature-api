import express, { Application } from "express";
import routes from "@src/routes/soundtrack";
import { apiErrorValidator } from "@src/middlewares/api-error-validator";
import * as database from "@src/database";

export class SetupServer {
  constructor(private port = 3333, private app = express()) {}

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupRoutes();
    this.setupErrorHandlers();
    await this.setupDatabase();
  }

  public getApp(): Application {
    return this.app;
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use(routes);
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public start(): void {
    this.app.listen(process.env.PORT || this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  public async close(): Promise<void> {
    await database.close();
  }
}
