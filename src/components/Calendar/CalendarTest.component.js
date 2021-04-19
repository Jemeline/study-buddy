import React, {useState}from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { get_initial_events, createEventId } from './event-utils';
import "./main.css"

function Calendar (u) {

  let cal = {
    user: u,
    currentEvents: []
  }
  // const user = u
  const [weekendsVisible, setUpdate] = useState(true);
  // setUpdate(false)
  
  return (
    <div className='demo-app'>
      {/* {renderSidebar(weekendsVisible, setUpdate)} */}
      <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={setUpdate(!weekendsVisible)}
          ></input>
          toggle weekends
        </label>
      </div>
      {/* <div className='demo-app-sidebar-section'>
        <h2>All Events ({this.state.currentEvents.length})</h2>
        <ul>
          {this.state.currentEvents.map(renderSidebarEvent)}
        </ul>
      </div> */}
    </div>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          //initialEvents={get_initial_events(this.state.user)} // alternatively, use the `events` setting to fetch from a feed
          events={get_initial_events(cal.user)}
          //select={handleDateSelect()}
          eventContent={renderEventContent()} // custom render function
          //eventClick={handleEventClick}
          //eventsSet={handleEvents(cal)} // called after events are initialized/added/changed/removed
          eventsSet={get_initial_events(cal.user)}

          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  )

}

// function renderSidebar(weekendsVisible, setUpdate) {
//   return (
//     <div className='demo-app-sidebar'>
//       <div className='demo-app-sidebar-section'>
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <label>
//           <input
//             type='checkbox'
//             checked={weekendsVisible}
//             onChange={setUpdate(!weekendsVisible)}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       {/* <div className='demo-app-sidebar-section'>
//         <h2>All Events ({this.state.currentEvents.length})</h2>
//         <ul>
//           {this.state.currentEvents.map(renderSidebarEvent)}
//         </ul>
//       </div> */}
//     </div>
//   )
// }


// function handleDateSelect(selectInfo) {
//   let title = prompt('Please enter a new title for your event')
//   let calendarApi = selectInfo.view.calendar

//   calendarApi.unselect() // clear date selection

//   if (title) {
//     calendarApi.addEvent({
//       id: createEventId(),
//       title,
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//       allDay: selectInfo.allDay
//     })
//   }
// }

/*handleEventClick = (clickInfo) => {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}*/

// function handleEvents(calendar) {
//   calendarsetState({
//     currentEvents: events
//   })
// }

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}

export default  Calendar;