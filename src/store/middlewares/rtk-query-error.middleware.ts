import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!', action);
    toast.error('Oops, have a little problem!', { description: action.payload?.data?.message || action.payload?.data || 'Service is currently unvailable.' });
  }

  return next(action);
};
