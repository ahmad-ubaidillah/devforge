export class DevForgeError extends Error {
  constructor(
    public message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'DevForgeError';
  }
}

export function handleError(error: unknown) {
  if (error instanceof DevForgeError) {
    console.error(`[${error.code}]: ${error.message}`);
    if (error.details) console.dir(error.details);
  } else {
    console.error('[Unexpected Error]:', error);
  }
}
