import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FilterForm, Resume } from '../../interfaces';
import { AvailabilityPipe } from '../../../../shared/pipes';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    AvailabilityPipe,
    FilterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, AfterViewInit {
  @Input()
  set setResumes(resumes: Resume[]) {
    this.dataSource.data = resumes;
  }
  @Output() resumeData = new EventEmitter<Resume>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Resume, MatPaginator> =
    new MatTableDataSource<Resume>();
  columns = [
    {
      columnDef: 'lastName',
      header: 'Nom',
      cell: (element: Resume) => `${element.user.lastName}`,
    },
    {
      columnDef: 'firstName',
      header: 'Prenom',
      cell: (element: Resume) => `${element.user.firstName}`,
    },
    {
      columnDef: 'role',
      header: 'Rôle',
      cell: (element: Resume) => `${element.role}`,
    },
    {
      columnDef: 'status',
      header: 'Statut',
      cell: (element: Resume) => `${element.status.label}`,
    },
    {
      columnDef: 'experiencesYears',
      header: "Nombre d'années d'expérience",
      cell: (element: Resume) => `${element.experiencesYears}`,
    },
    {
      columnDef: 'availabilityDate',
      header: 'date disponibilite',
      cell: (element: Resume) => `${element.availabilityDate}`,
    },
    {
      columnDef: 'dailyRate',
      header: 'JTM',
      cell: (element: Resume) => `${element.dailyRate}`,
    },
  ];

  displayedColumns: string[] = this.columns.map((column) => column.columnDef);

  ngOnInit(): void {
    this.applyFilter({ lastNameOrRole: '', status: '' });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Emit the resume to display it's details
   * @param resume contains resume's data
   */
  displayResume(resume: Resume): void {
    this.resumeData.emit(resume);
  }

  /**
   * custom filter for dataSource
   * @returns a function that filter all resumes
   */
  customFilterPredicate() {
    return ({ user, role, status }: Resume, filter: string) => {
      const filterValues: FilterForm = JSON.parse(filter);

      const lastNameOrRoleFilter: boolean =
        !filterValues.lastNameOrRole ||
        user.lastName.toLowerCase().includes(filterValues.lastNameOrRole) ||
        role.toLowerCase().includes(filterValues.lastNameOrRole);
      const statusFilter: boolean =
        !filterValues.status || status.label == filterValues.status;

      return lastNameOrRoleFilter && statusFilter;
    };
  }

  /**
   * Applying filters to dataSource
   * @param filterValue contains the filter values
   */
  applyFilter(filterValues: FilterForm) {
    this.dataSource.filter = JSON.stringify(filterValues);
  }
}
