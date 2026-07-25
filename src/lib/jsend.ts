export function jsendSuccess(data: any, code = 200) {
  return Response.json({ status: "success", data }, { status: code });
}

export function jsendFail(data: any, code = 400) {
  return Response.json({ status: "fail", data }, { status: code });
}

export function jsendError(message: string, code = 500, data?: any) {
  const payload: any = { status: "error", message };
  if (data !== undefined) payload.data = data;
  return Response.json(payload, { status: code });
}
