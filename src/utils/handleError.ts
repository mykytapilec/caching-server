import { Response } from 'express';

export const handleError = (res: Response, error: any) => {
  console.error('Error:', error?.message || error);

  res.status(500).json({
    error: error?.message || 'Internal Server Error',
  });
};