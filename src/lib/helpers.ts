import { NextResponse } from 'next/server';
import { ZodIssue } from 'zod';

export type ApiResponseSuccess = {
  total_items?: number;
  items_per_page?: number;
  page?: number;
  data?: Record<string, any>[] | Record<string, any> | string;
  message?: string;
};

export type ApiResponseError = {
  errors: ApiError[] | ZodIssue[];
  message: string;
};

export type ApiError = Partial<ZodIssue> & {
  code: string;
};

export class CustomNextResponse {
  static error(error: ApiResponseError, status = 400): NextResponse<ApiResponseError> {
    return NextResponse.json({ ...error } as ApiResponseError, { status });
  }

  static success(response: ApiResponseSuccess, status = 200) {
    return NextResponse.json({ ...response } as ApiResponseSuccess, { status });
  }

  static raise(message: string, status = 400): NextResponse<ApiResponseError> {
    return NextResponse.json({ message } as ApiResponseError, { status });
  }
}
