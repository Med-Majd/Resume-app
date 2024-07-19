import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResumeService } from '../services/resume.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { inject } from '@angular/core';
import { ResumeApiActions } from './resume.actions';
import { Resume } from '../interfaces';

export const loadResumes = createEffect(
  (action$ = inject(Actions), resumeService = inject(ResumeService)) => {
    return action$.pipe(
      ofType(ResumeApiActions.loadResumes),
      switchMap(() =>
        resumeService.getAllResumes().pipe(
          mergeMap((resumes: Resume[]) => [
            ResumeApiActions.loadResumesSuccess({ resumes }),
            ResumeApiActions.loadVisibleResumesIds(),
          ]),
          catchError((error) =>
            of(ResumeApiActions.loadResumesFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadVisibleResumes = createEffect(
  (actions$ = inject(Actions), resumeService = inject(ResumeService)) => {
    return actions$.pipe(
      ofType(ResumeApiActions.loadVisibleResumesIds),
      switchMap(() =>
        resumeService.getVisibleResume().pipe(
          map((ids: { id: number }[]) =>
            ResumeApiActions.loadVisibleResumesIdsSuccess({ ids })
          ),
          catchError((error) =>
            of(ResumeApiActions.loadVisibleResumesIdsFailure({ error }))
          )
        )
      )
    );
  },
  {
    functional: true,
  }
);
