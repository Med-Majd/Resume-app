import { format } from 'date-fns';
import { AvailabilityPipe } from './availability.pipe';

describe('AvailabilityPipe', () => {
  const pipe = new AvailabilityPipe();

  it('sould transforms past date to "Disponible"', () => {
    const PastDate = new Date();
    PastDate.setDate(PastDate.getDate() - 1);
    const PastDateStr = format(PastDate, 'dd-MM-yyyy');
    expect(pipe.transform(PastDateStr)).toBe('Disponible');
  });

  it('sould transforms today date to "Disponible"', () => {
    const today = new Date();
    const todayStr = format(today, 'dd-MM-yyyy');
    expect(pipe.transform(todayStr)).toBe('Disponible');
  });

  it('sould transforms future date to "Disponible le XX/XX/XXXX"', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateStr = format(futureDate, 'dd-MM-yyyy');
    expect(pipe.transform(futureDateStr)).toBe(
      `Disponible le ${format(futureDate, 'dd/MM/yyyy')}`
    );
  });
});
