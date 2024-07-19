import { createReducer, on } from '@ngrx/store';
import { ResumeApiActions } from './resume.actions';
import { initialState } from './resume.state';
import { Resume } from '../interfaces';

export const resumeReducer = createReducer(
  initialState,
  on(ResumeApiActions.loadResumes, (state) => ({ ...state, isLoading: true })),
  on(ResumeApiActions.loadResumesSuccess, (state, { resumes }) => ({
    ...state,
    resumes,
    isLoading: false,
  })),
  on(ResumeApiActions.loadResumesFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false,
  })),

  on(ResumeApiActions.loadVisibleResumesIds, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(ResumeApiActions.loadVisibleResumesIdsSuccess, (state, { ids }) => {
    const resumeIdsToExtract: number[] = ids.map((id) => id.id);
    const visibleResumes: Resume[] = state.resumes.filter((resume: Resume) =>
      resumeIdsToExtract.includes(resume.id)
    );
    return {
      ...state,
      visibleResumes,
      isLoading: false,
    };
  }),
  on(ResumeApiActions.loadVisibleResumesIdsFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false,
  }))
);
