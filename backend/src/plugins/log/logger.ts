import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

interface ILogger {
  error(message: string, error?: unknown): void;
  info(message: string): void;
}

export class TransactionLogger {
  constructor(private logCollector: string[] = []) {}
  log(message: string) {
    this.logCollector.push(message);
  }
  flush(logger: AppLogger) {
    logger.info(`[LifeTimeLogger]: ${JSON.stringify(this.logCollector)}`);
  }
}

class AppLogger implements ILogger {
  private errorLogger;
  private infoLogger;

  constructor(serviceName: string, logDirectoryLocation: string = "/tmp") {
    const logDirectory = path.join(
      process.env.HOME ?? logDirectoryLocation,
      "app_logs",
      serviceName
    );

    // Create a directory for logs if it doesn't exist
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }
    const format = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    );

    this.errorLogger = winston.createLogger({
      format,
      transports: [
        new DailyRotateFile({
          filename: path.join(logDirectory, `${serviceName}_error.log`),
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "7d",
          level: "error", // Set the log level for error transport
        }),
      ],
    });

    this.infoLogger = winston.createLogger({
      format,
      transports: [
        new DailyRotateFile({
          filename: path.join(logDirectory, `${serviceName}_info.log`),
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "7d",
          level: "info", // Set the log level for info transport
        }),
      ],
    });
  }

  error(message: string, error?: unknown): void {
    console.log(message, error);
    this.errorLogger.error(message);
  }

  info(message: string): void {
    console.log(message);
    this.infoLogger.info(message);
  }
}

export { AppLogger };
