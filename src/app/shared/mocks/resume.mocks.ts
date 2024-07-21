import { Resume } from '../../features/resume/interfaces';

export const resumesMock: Resume[] = [
  {
    id: 9,
    role: 'Global Response Engineer',
    status: {
      label: 'NEW',
      color: 'orange',
    },
    experiencesYears: 7,
    availabilityDate: '29-10-2024',
    dailyRate: 528,
    user: {
      id: '2ae2a226-a695-4a8f-bec4-a4ba27047853',
      firstName: 'Regina',
      lastName: 'Kub',
      phone: '+33 (6) 53168581',
      email: 'Regina97@yahoo.com',
    },
    experiences: [],
    education: [],
  },
  {
    id: 33,
    role: 'Principal Program Director',
    status: {
      label: 'NEW',
      color: 'orange',
    },
    experiencesYears: 0,
    availabilityDate: '15-08-2021',
    dailyRate: 400,
    user: {
      id: '6eb873ac-4620-4f25-bbd6-9b800c053e19',
      firstName: 'Lee',
      lastName: 'Gibson',
      phone: '+33 (6) 48282445',
      email: 'Lee.Gibson@hotmail.com',
    },
    experiences: [],
    education: [],
  },
  {
    id: 34,
    role: 'Investor Implementation Liaison',
    status: {
      label: 'PROCESSING',
      color: 'blue',
    },
    experiencesYears: 6,
    availabilityDate: '13-12-2024',
    dailyRate: 515,
    user: {
      id: 'd182c99a-851f-4745-b946-6d6aaca06d6f',
      firstName: 'Lora',
      lastName: 'Gerlach',
      phone: '+33 (6) 35943783',
      email: 'Lora94@gmail.com',
    },
    experiences: [],
    education: [],
  },
];
