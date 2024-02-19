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

  getById(id: number) {
    return this.httpClient.get(`${environment.eventsBaseUrl}/edit/${id}`);
  }

  add(dto: any) {
    return this.httpClient.post(`${environment.eventsBaseUrl}/add`, dto);
  }

  update(dto: any) {
    return this.httpClient.put(`${environment.eventsBaseUrl}/update/${dto.id}`, dto);
  }

  remove(id: string) {
    return this.httpClient.delete(`${environment.eventsBaseUrl}/delete/${id}`);
  }
}
