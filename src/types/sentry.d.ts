declare module "@sentry/nextjs" {
  export function init(options?: any): void;
  export function captureException(exception: any, captureContext?: any): string;
  export function captureMessage(message: string, captureContext?: any): string;
  export function captureRequestError(error: any, request: any, context?: any): void;
}
