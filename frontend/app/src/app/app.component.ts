import { Component } from '@angular/core';
import { EventService } from './services/event/event.service';
import { INITIAL_EVENTS, dateString, updateEventId } from '../utils/calender-event-utils';
import { Router } from '@angular/router';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  fromDate: string = '';
  toDate: string = '';
  
  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.router.navigate(['']);
    this.eventService.getList().subscribe((eventsData: any) => {
      eventsData.map((event: any) => {   
        let id = updateEventId(event.id);
        INITIAL_EVENTS.push({
          id: id,
          title: event.title,
          start: dateString(event.start),
          end: dateString(event.end),
        });
      });
      localStorage.setItem('token', 'secret');
      this.router.navigate(['./calendar']);
    });
  }

  applyFilter() {
    this.router.navigate(['']);
    this.eventService.eventsDateWise(this.fromDate, this.toDate).subscribe((eventsData: any) => {
      INITIAL_EVENTS.length = 0;
      eventsData.map((event: any) => {   
        let id = updateEventId(event.id);
        INITIAL_EVENTS.push({
          id: id,
          title: event.title,
          start: dateString(event.start),
          end: dateString(event.end),
        });
      });
      localStorage.setItem('token', 'secret');
      this.router.navigate(['./calendar']);
    });
  }
}
