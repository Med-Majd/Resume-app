import { Resume } from '../interfaces';

export interface ResumeState {
  resumes: Resume[];
  visibleResumes: Resume[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ResumeState = {
  resumes: [],
  visibleResumes: [],
  isLoading: false,
  error: null,
};

export const getResumes = (state: ResumeState) => state?.resumes;
export const getVisibleResumes = (state: ResumeState) => state?.visibleResumes;
export const getIsLoading = (state: ResumeState) => state?.isLoading;
export const getError = (state: ResumeState) => state?.error;
