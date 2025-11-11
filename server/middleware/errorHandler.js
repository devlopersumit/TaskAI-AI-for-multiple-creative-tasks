export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found.`,
    },
  });
};

export const errorHandler = (error, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = error.status || error.statusCode || 500;
  const message = error.message || 'Something went wrong.';

  if (status >= 500) {
    console.error('[server:error]', error);
  }

  res.status(status).json({
    success: false,
    error: {
      message,
      details: error.details ?? undefined,
    },
  });
};

