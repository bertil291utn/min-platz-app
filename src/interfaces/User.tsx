export interface User {
  id: string
  email: string;
  name: string;
  fullName: string
  premium: boolean;
  expert: boolean;
  avatar?: string;
}