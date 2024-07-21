import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AvailabilityPipe } from '../../../../shared/pipes';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { resumesMock } from '../../../../shared/mocks';
import { FilterForm, Resume } from '../../interfaces';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@Component({
  selector: 'app-filter',
  template: '',
})
class MockFilterComponent {}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let paginator: MatPaginator;
  const mockResumes: Resume[] = resumesMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule, AvailabilityPipe],
      declarations: [MockFilterComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    paginator = fixture.debugElement.query(
      By.directive(MatPaginator)
    ).componentInstance;
    component.setResumes = mockResumes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the dataSource when resumes input changes', () => {
    expect(component.dataSource.data).toEqual(mockResumes);
  });

  it('should set paginator after view init', () => {
    expect(component.dataSource.paginator).toBe(paginator);
  });

  it('should emit resume when displayResume is called', () => {
    spyOn(component.resume, 'emit');
    const resume: Resume = mockResumes[0];
    component.displayResume(resume);
    expect(component.resume.emit).toHaveBeenCalledWith(resume);
  });

  it('should correctly configure the filter predicate', () => {
    const filterPredicate = component.customFilterPredicate();
    const resume: Resume = mockResumes[0];
    const filterValues = JSON.stringify({
      lastNameOrRole: 'doe',
      status: '',
    });
    expect(filterPredicate(resume, filterValues)).not.toBeTrue();
  });

  it('should filter and return two resumes based on filter criteria', () => {
    const filterValues = { lastNameOrRole: 'gi', status: 'NEW' };
    component.applyFilter(filterValues);
    fixture.detectChanges();
    const filteredData = component.dataSource.filteredData;
    expect(filteredData.length).toBe(2);
  });

  it('should filter resumes based on filter criteria', () => {
    const filterValues: FilterForm = { lastNameOrRole: 'gib', status: 'NEW' };
    component.applyFilter(filterValues);
    fixture.detectChanges();
    const filteredData = component.dataSource.filteredData;
    expect(filteredData.length).toBe(1);
    expect(filteredData[0].user.lastName.toLocaleLowerCase()).toBe('gibson');
    expect(filteredData[0].status.label).toBe('NEW');
  });
});
