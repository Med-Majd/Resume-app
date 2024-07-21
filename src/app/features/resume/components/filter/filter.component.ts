import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { STATUSES, StatusFilter } from '../../constants';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FilterForm } from '../../interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class FilterComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  @Output() filterValues: EventEmitter<FilterForm> =
    new EventEmitter<FilterForm>();
  statuses: StatusFilter[] = STATUSES;
  form!: FormGroup;

  subscription!: Subscription;

  ngOnInit() {
    this.initForm();
    this.detectChanges();
  }

  /**
   * initiate the filter form
   */
  initForm() {
    this.form = this.formBuilder.group({
      lastNameOrRole: [''],
      status: [''],
    });
  }

  /**
   * Emit filters values after any change
   */
  detectChanges() {
    this.subscription = this.form.valueChanges.subscribe(
      (value: FilterForm) => {
        const filter: FilterForm = {
          ...value,
          lastNameOrRole: value.lastNameOrRole?.trim().toLowerCase(),
        };
        this.filterValues.emit(filter);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
