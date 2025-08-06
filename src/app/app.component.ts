import { Component } from '@angular/core';
import { CalendarContainerComponent } from './components/calendar-container/calendar-container.component';

@Component({
  selector: 'app-root',
  imports: [ CalendarContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'custom-components';
}
