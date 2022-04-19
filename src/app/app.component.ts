import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MockService } from './mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'loading-button-demo';

  constructor(private service: MockService) {}

  getA() {
    this.service.getA().subscribe();
  }

  getB() {
    this.service.getB().subscribe();
  }

  getBoth() {
    forkJoin(this.service.getA(), this.service.getB()).subscribe();
  }
}
