export function success(res: any, data: any = {}, message: string = "success", status: number = 200) {
  return res.status(status).json({
    success: true,
    data,
    message,
  });
}

export function failure(res: any, message: string = "failed", status: number = 400) {
  return res.status(status).json({
    success: false,
    data: null,
    message,
  });
}
