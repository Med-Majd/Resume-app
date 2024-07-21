import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FilterForm } from '../../interfaces';
import { STATUSES } from '../../constants';
import { ReactiveFormsModule } from '@angular/forms';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent, ReactiveFormsModule],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have statuses defined from STATUSES constant', () => {
    expect(component.statuses).toEqual(STATUSES);
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('lastNameOrRole')).toBeTruthy();
    expect(component.form.get('status')).toBeTruthy();
  });

  it('should emit well formated filterValues on form value changes', () => {
    spyOn(component.filterValues, 'emit');
    const formValue: FilterForm = {
      lastNameOrRole: '  GibSon   ',
      status: 'NEW',
    };
    component.form.setValue(formValue);
    expect(component.filterValues.emit).toHaveBeenCalledWith({
      lastNameOrRole: 'gibson',
      status: 'NEW',
    });
  });

  it('should unsubscribe from form value changes on destroy', () => {
    const subscriptionSpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });
});
