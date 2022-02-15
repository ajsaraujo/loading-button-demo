import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  private endpoint = 'https://mymock.free.beeceptor.com';

  constructor(private http: HttpClient) {}

  getA() {
    return this.http.get(`${this.endpoint}/a`);
  }

  getB() {
    return this.http.get(`${this.endpoint}/b`);
  }
}
