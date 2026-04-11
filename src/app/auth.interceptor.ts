import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // ❗ Skip if FormData (important)
  if (req.body instanceof FormData) {
    return next(req);
  }

  // ✅ Add JSON header
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  return next(modifiedReq);
};