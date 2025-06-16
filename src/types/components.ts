import { ReactNode } from 'react';

export interface AuthSidePanelProps {
  title: string;
  description: string;
  imageUrl: string;
}

export interface FloatingCircleProps {
  delay?: number;
  size?: number;
  color?: string;
  className?: string;
}

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface PublicRouteProps {
  children: ReactNode;
} 

export interface LoginFormData {
  email: string;
  password: string;
  [key: string]: string;
}


export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    [key: string]: string;
}
  
  