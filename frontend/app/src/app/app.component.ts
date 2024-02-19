import { Component } from '@angular/core';
import { EventService } from './services/event/event.service';
import { INITIAL_EVENTS, dateString } from '../utils/calender-event-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private eventService: EventService, private router: Router) {
  }

  ngOnInit() {
    this.eventService.getList().subscribe((eventsData: any) => {
      eventsData.map((event: any) => {   
        INITIAL_EVENTS.push({
          id: event.id,
          title: event.title,
          start: dateString(event.start),
          end: dateString(event.end),
        });
      });
      this.router.navigate(['./calendar']);
    });
    
  }
}