export interface User {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  firstName: string;
  lastName: string;
  plan: string;
  status: string;
  joined: string;
  lastActive: string;
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy: string;
}
