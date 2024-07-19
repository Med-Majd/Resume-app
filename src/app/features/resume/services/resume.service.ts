import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Resume } from '../interfaces/resume.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  readonly http = inject(HttpClient);
  baseUrl: string = environment.baseUrl;

  /**
   * Retrieve all resumes
   * @returns observable contains an array of resumes
   */
  getAllResumes(): Observable<Resume[]> {
    const endPoint: string = 'all-resumes';
    return this.http.get<Resume[]>(`${this.baseUrl}/${endPoint}`);
  }

  /**
   * Retrieve the IDs of the resumes that must be displayed
   * @returns observable contains the IDs of the resumes
   */
  getVisibleResume(): Observable<{ id: number }[]> {
    const endPoint: string = 'visible-resumes';
    return this.http.get<Resume[]>(`${this.baseUrl}/${endPoint}`);
  }
}
