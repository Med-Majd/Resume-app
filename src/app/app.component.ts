import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumeComponent } from './features/resume/pages/resume/resume.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, ResumeComponent],
})
export class AppComponent {
  title = 'resume-app';
}
