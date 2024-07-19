import { createSelector } from '@ngrx/store';
import { AppState } from '../../../core/store';
import * as fromResumeState from './resume.state';

export const selectResumesState = (state: AppState) => state?.resume;

export const selectResumes = createSelector(
  selectResumesState,
  fromResumeState.getResumes
);

export const selectVisibleResumes = createSelector(
  selectResumesState,
  fromResumeState.getVisibleResumes
);

export const selectIsLoading = createSelector(
  selectResumesState,
  fromResumeState.getIsLoading
);

export const selectError = createSelector(
  selectResumesState,
  fromResumeState.getError
);
