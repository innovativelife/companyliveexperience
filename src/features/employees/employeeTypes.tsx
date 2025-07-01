export interface Employee {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  PreferredName: string;
  email: string;
  phoneNumber: string;
  positionTitle: string;
  personalDescription: string;
  avatarURL: string | null;
  employeeUID: string;
}

export interface CreateEmployeePayload {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  PreferredName: string;
  email: string;
  phoneNumber: string;
  positionTitle: string;
  personalDescription: string;
  avatarURL: string | null;
}
