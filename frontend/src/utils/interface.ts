export interface RouteLayout {
  link: string;
  element: React.ComponentType;
  isProtected: boolean;
}

export interface User {
  fullName: string;
  id: number;
  email: string;
  password: string;
  role: Role;
}
export enum Role {
  JOB_SEEKER = "JOB_SEEKER",
  EMPLOYER = "EMPLOYER",
}

export interface Job {
  id: number;
  category: string;
  createdAt: Date | number | string;
  description: string;
  employerId: number;
  location: string;
  salary: number;
  skills: string[];
  title: string;
  employer: Employer;
}

export interface Employer {
  id: number;
  email: string;
  fullName: string;
  role: string;
}
