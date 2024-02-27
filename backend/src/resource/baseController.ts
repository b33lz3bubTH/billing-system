import express, { Router } from "express";

/* DEPRECATED: BASE CONTROLLER
USE GRAPHQL
*/

abstract class BaseController {
  protected router: Router = express.Router();
  protected abstract initializeRoutes(): void;
  abstract getRouter(): Router;
}

export { BaseController };
