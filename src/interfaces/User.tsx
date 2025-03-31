export interface User {
  id: string
  email: string;
  name: string;
  lastName: string
  premium: boolean;
  expert: boolean;
  whatsapp: string;
  rucId: string;
  avatar?: string;
}