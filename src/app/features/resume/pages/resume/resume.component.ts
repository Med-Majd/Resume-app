import { Component, inject, OnInit } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ResumeApiActions, selectVisibleResumes } from '../../store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Resume } from '../../interfaces';
import { AppState } from '../../../../core/store';
import { DetailsComponent, ListComponent } from '../../components';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  standalone: true,
  imports: [CommonModule, ListComponent],
})
export class ResumeComponent implements OnInit {
  readonly resumeService: ResumeService = inject(ResumeService);
  readonly store: Store<AppState> = inject(Store);
  readonly dialog: MatDialog = inject(MatDialog);

  resumes$: Observable<Resume[]> = this.store.select(selectVisibleResumes);

  ngOnInit(): void {
    this.store.dispatch(ResumeApiActions.loadResumes());
  }

  /**
   * Display resume's details in a dialog window
   * @param resume contains resume's data
   */
  openDialog(resume: Resume): void {
    this.dialog.open(DetailsComponent, {
      data: resume,
      maxWidth: '50vw',
      maxHeight: '90vh',
    });
  }
}
