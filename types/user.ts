export interface User {
  statusCode: number;
  success: boolean;
  message: string;
  user_data: UserData;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  names: string;
  gender: string;
  image: string;
  status: number;
  token: string;
}

export interface UserProject {
  icon: string;
  name: string;
  type: string;
  balance: null;
  is_favorite: number;
  description: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface GoogleLogin {
  token: string;
}
