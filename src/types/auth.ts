export type UserType = 'ngo' | 'government' | 'corporate';

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
  organization?: string;
  verified?: boolean;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  userType: UserType | null;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}