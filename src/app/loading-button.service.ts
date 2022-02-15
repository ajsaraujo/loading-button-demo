import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

export enum EventType {
  StartLoading,
  StopLoading,
}

export type LoadingEvent = {
  endpoint: string;
  type: EventType;
};

@Injectable({
  providedIn: 'root',
})
export class LoadingButtonService {
  events$: Observable<LoadingEvent>;

  private subject = new ReplaySubject<LoadingEvent>(1);

  constructor() {
    this.events$ = this.subject.asObservable();
  }

  startLoading(endpoint: string) {
    this.subject.next({ endpoint, type: EventType.StartLoading });
  }

  finishLoading(endpoint: string) {
    this.subject.next({ endpoint, type: EventType.StopLoading });
  }
}
