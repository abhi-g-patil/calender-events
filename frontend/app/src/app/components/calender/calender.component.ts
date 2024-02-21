import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId, dateString } from '../../../utils/calender-event-utils';
import { EventService } from '../../services/event/event.service';
import Swal from 'sweetalert2';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, private eventService: EventService,  private socketService: SocketService) { }

  async ngOnInit() {
    this.socketService.getMessages().subscribe((message: any) => {
      console.log(message);
    });
  }

  async handleDateSelect(selectInfo: DateSelectArg) {
    const { value: formValues } = await Swal.fire({
      title: "Multiple inputs",
      html: `
        <input id="title" class="swal2-input" placeholder="Title">
        <input type="datetime-local" id="start" class="swal2-input" placeholder="Start Date & Time">
        <input type="datetime-local" id="end" class="swal2-input" placeholder="End Date & Time">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const titleElem = document.getElementById("title") as HTMLInputElement;
        const startElem = document.getElementById("start") as HTMLInputElement;
        const endElem = document.getElementById("end") as HTMLInputElement;
        return {
          title: titleElem.value,
          start: startElem.value,
          end: endElem.value
        };
      }
    });
    
    if (!formValues.title || !formValues.start || !formValues.end) {
      return Swal.fire('All Values are required.!');
    }
    
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    let event = {
      id: createEventId(),
      title: formValues.title,
      start: formValues.start,
      end: formValues.end
    };
    this.eventService.add(event).subscribe((eventdata: any) => {
      calendarApi.addEvent(event);
    })
    return;
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      this.eventService.remove(clickInfo.event.id).subscribe((eventData) => {
        clickInfo.event.remove();
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
