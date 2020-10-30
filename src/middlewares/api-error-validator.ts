import { Request, Response, NextFunction } from "express";

export interface HTTPError extends Error {
  status?: number;
}

export function apiErrorValidator(
  error: HTTPError,
  _: Partial<Request>,
  res: Response,
  __: NextFunction
): void {
  const errorCode = error.status || 500;
  res.status(errorCode).json({ code: errorCode, message: error.message });
}
