import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/dev';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  getList() {
    return this.httpClient.get(`${environment.eventsBaseUrl}/get`);
  }

  add(dto: any) {
    return this.httpClient.post(`${environment.eventsBaseUrl}/add`, dto);
  }

  remove(id: string) {
    return this.httpClient.delete(`${environment.eventsBaseUrl}/delete/${id}`);
  }

  eventsDateWise(fromDate: string, toDate: string) {
    return this.httpClient.get(`${environment.eventsBaseUrl}/get/period?from='${fromDate}'&to='${toDate}'`);
  }
}
