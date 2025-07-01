import { Employee } from "../employees/employeeTypes";

export interface Tenant {
  tenantId: string;
  tenantName: string;
  customerName: string;
}

export interface CreateTenantPayload {
  tenantId: string;
  tenantName: string;
  customerName: string;
  renewalDate: string;
  active: boolean;
  primaryAdministrator: Employee;
  secondaryAdministrator: Employee;
}
