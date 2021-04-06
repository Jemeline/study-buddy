import React from 'react'
import { render } from 'react-dom'
import DemoApp from './DemoApp'
import './main.css'

function Calendar(props) {
return render(<DemoApp />, document.body.appendChild(document.createElement('div')));

// document.addEventListener('DOMContentLoaded', function() {
//   render(
//     <DemoApp />,
//     document.body.appendChild(document.createElement('div'))
//   )
// })

};
 
export default Calendar;