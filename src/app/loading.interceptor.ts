import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingButtonService } from './loading-button.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingButtonService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const endpoint = request.url;

    this.loading.startLoading(endpoint);

    return next
      .handle(request)
      .pipe(finalize(() => this.loading.finishLoading(endpoint)));
  }
}
