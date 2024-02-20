import { EventInput } from '@fullcalendar/core';
import * as moment from 'moment/moment';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export function dateString(date: Date) {
  return moment(date).format('YYYY-MM-DDThh:mm:ss');
}

export const INITIAL_EVENTS: EventInput[] = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: TODAY_STR
  // },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: TODAY_STR + 'T00:00:00',
  //   end: TODAY_STR + 'T03:00:00'
  // },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: TODAY_STR + 'T12:00:00',
  //   end: TODAY_STR + 'T15:00:00'
  // }
];

export function updateEventId(id: any) {
  if(id>eventGuid) eventGuid = id;
  console.log(eventGuid);
  
  return String(id)
}

export function createEventId() {
  return String(eventGuid++);
}
