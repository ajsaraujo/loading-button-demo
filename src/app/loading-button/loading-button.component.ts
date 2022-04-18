import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import { EventType, LoadingButtonService } from '../loading-button.service';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
})
export class LoadingButtonComponent implements OnInit {
  @Input() endpoint = '';
  @Input() label = '';

  @Input() endpoints: string[] = [];

  isLoading$!: Observable<boolean>;

  constructor(private loading: LoadingButtonService) {}

  ngOnInit(): void {
    if (this.hasMultipleEndpoints) {
      this.isLoading$ = this.listenToMany(this.endpoints);
    } else {
      this.isLoading$ = this.listenTo(this.endpoint);
    }
  }

  private get hasMultipleEndpoints() {
    return this.endpoints.length > 0;
  }

  private listenTo(endpoint: string) {
    return this.loading.events$.pipe(
      filter((event) => event.endpoint.includes(endpoint)),
      map((event) => event.type === EventType.StartLoading)
    );
  }

  private listenToMany(endpoints: string[]): Observable<boolean> {
    console.log(`listening to ${endpoints}`);

    return combineLatest(
      endpoints.map((endpoint) => this.listenTo(endpoint))
    ).pipe(
      tap(console.log),
      map((isLoading) => isLoading.some((isLoading: boolean) => isLoading))
    );
  }
}
