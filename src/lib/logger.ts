interface ErrorContext {
  error: unknown
  context: string
  action: string
  timestamp: string
  message: string
  [key: string]: unknown
}


export const logError = (errorContext: ErrorContext): void => {
    if (import.meta.env.MODE === 'development') {
    console.error(errorContext)
  }
}

