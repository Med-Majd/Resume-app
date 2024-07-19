import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Resume } from '../interfaces';

export const ResumeApiActions = createActionGroup({
  source: 'Resumes API',
  events: {
    'Load Resumes': emptyProps(),
    'Load Resumes Success': props<{ resumes: Resume[] }>(),
    'Load Resumes Failure': props<{ error: string }>(),
    'Load Visible Resumes Ids': emptyProps(),
    'Load Visible Resumes Ids Success': props<{ ids: { id: number }[] }>(),
    'Load Visible Resumes Ids Failure': props<{ error: string }>(),
  },
});
