import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { EventType, LoadingButtonService } from '../loading-button.service';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
})
export class LoadingButtonComponent implements OnInit {
  @Input() endpoint = '';
  @Input() label = '';

  isLoading$!: Observable<boolean>;

  constructor(private loading: LoadingButtonService) {}

  ngOnInit(): void {
    this.isLoading$ = this.loading.events$.pipe(
      filter((event) => event.endpoint.includes(this.endpoint)),
      map((event) => event.type === EventType.StartLoading)
    );
  }
}
