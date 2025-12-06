import { config } from '../config';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  context?: LogContext;
}

class Logger {
  private isDevelopment = config.nodeEnv === 'development';

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private formatLog(entry: LogEntry): string {
    if (this.isDevelopment) {
      // Human-readable format for development
      const timestamp = new Date(entry.timestamp).toLocaleString();
      let output = `[${timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;

      if (entry.error) {
        output += `\n  Error: ${entry.error.name}: ${entry.error.message}`;
        if (entry.error.stack) {
          output += `\n  Stack: ${entry.error.stack.split('\n').slice(0, 5).join('\n    ')}`;
        }
      }

      if (entry.context && Object.keys(entry.context).length > 0) {
        output += `\n  Context: ${JSON.stringify(entry.context, null, 2)}`;
      }

      return output;
    }

    // JSON format for production
    return JSON.stringify(entry);
  }

  private log(level: LogLevel, message: string, error?: Error, context?: LogContext): void {
    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      message,
    };

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    if (context && Object.keys(context).length > 0) {
      entry.context = context;
    }

    const formattedLog = this.formatLog(entry);

    // Output to appropriate stream
    switch (level) {
      case 'error':
        console.error(formattedLog);
        break;
      case 'warn':
        console.warn(formattedLog);
        break;
      case 'info':
        console.info(formattedLog);
        break;
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedLog);
        }
        break;
    }
  }

  error(message: string, error?: Error, context?: LogContext): void {
    this.log('error', message, error, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, undefined, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, undefined, context);
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, undefined, context);
  }
}

export const logger = new Logger();

