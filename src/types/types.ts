export interface ITodos {
  id: string;
  title: string;
}

export interface IUser {
  userName: string;
  fullName: string;
  lastLogin: Date | string;
  enabled: boolean | string;
}
