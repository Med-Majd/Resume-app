import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ResumeService } from './resume.service'; // Adjust the path as necessary
import { environment } from '../../../../environments/environment';
import { Resume } from '../interfaces';
import { resumesMock } from '../../../shared/mocks';
import { provideHttpClient } from '@angular/common/http';

describe('ResumeService', () => {
  let service: ResumeService;
  let httpTestingController: HttpTestingController;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ResumeService,
      ],
    });

    service = TestBed.inject(ResumeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve all resumes', () => {
    const mockResumes: Resume[] = resumesMock;

    service.getAllResumes().subscribe((resumes) => {
      expect(resumes).toEqual(mockResumes);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/all-resumes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResumes);
  });

  it('should retrieve visible resume IDs', () => {
    const mockVisibleResumes: { id: number }[] = [{ id: 1 }, { id: 2 }];

    service.getVisibleResume().subscribe((resumes) => {
      expect(resumes).toEqual(mockVisibleResumes);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/visible-resumes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVisibleResumes);
  });
});
