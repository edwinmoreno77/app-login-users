export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  last_login?: string;
  profile: {
    avatar?: string;
    phone?: string;
    address?: string;
  };
} 