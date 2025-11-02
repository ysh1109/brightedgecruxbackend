import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("SERVER ERROR:", err);

  const status = err.status || 500;

  return res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err
  });
};
