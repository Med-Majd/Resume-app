import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Resume } from '../../interfaces';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AvailabilityPipe } from '../../../../shared/pipes';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    AvailabilityPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public resume: Resume) {}
}
