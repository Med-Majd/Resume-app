export interface StatusFilter {
  label: string;
  value: string;
}

export const STATUSES: StatusFilter[] = [
  { label: 'Nouveau', value: 'NEW' },
  { label: 'En cours', value: 'PROCESSING' },
  { label: 'Validé', value: 'VALIDATED' },
  { label: 'Refusé', value: 'REFUSED' },
];
