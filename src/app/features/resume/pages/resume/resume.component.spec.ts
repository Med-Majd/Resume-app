import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeComponent } from './resume.component';
import { ResumeService } from '../../services/resume.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../core/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ResumeApiActions, selectVisibleResumes } from '../../store';
import { of } from 'rxjs';

import { Resume } from '../../interfaces';
import { DetailsComponent } from '../../components';
import { resumesMock } from '../../../../shared/mocks';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatDialogModule, ResumeComponent],
      providers: [
        { provide: MatDialog, useValue: dialog },
        provideMockStore({
          initialState: { visibleResumes: [] },
          selectors: [{ selector: selectVisibleResumes, value: of([]) }],
        }),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideHttpClientTesting(),
        ResumeService,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadResumes action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(ResumeApiActions.loadResumes());
  });

  it('should open a dialog with resume details', () => {
    const resume: Resume = resumesMock[0];
    component.openDialog(resume);
    expect(dialog.open).toHaveBeenCalledOnceWith(DetailsComponent, {
      data: resume,
      maxWidth: '50vw',
      maxHeight: '90vh',
    });
  });
});
