export interface ServiceResult<T> {

  success: boolean;

  data?: T;

  error?: string;

}

export function ok<T>(
  data: T
): ServiceResult<T> {

  return {

    success: true,

    data,

  };

}

export function fail<T>(
  message: string
): ServiceResult<T> {

  return {

    success: false,

    error: message,

  };

}
