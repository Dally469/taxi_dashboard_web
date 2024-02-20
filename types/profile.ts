export interface UserProfile {
  status: boolean;
  statusCode: number;
  message: string;
  success: boolean;
  user_data: UserData;
  user_projects: UserProject[];
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  names: string;
  gender: string;
  image: string;
  status: number;
  sms_balance: number;
}

export interface UserProject {
  icon: string;
  name: string;
  type: string;
  balance: null;
  is_favorite: boolean;
  description: string;
}


export interface ProjectSize {
  statusCode: number;
  message: string;
  success: boolean;
  project_size_data: ProjectSizeData[];
}

export interface ProjectSizeData {
  id: number;
  title: string;
}


export interface Project {
  id: number;
  icon: string;
  name: string;
  createdBy: string;
  type: string;
  isFavorite: boolean;
  description: string;
  teams: Team[];
  features: Feature[];
}

export interface Feature {
  title: string;
  icon: string;
  to: string;
  expanded: boolean;
  children: Child[];
}

export interface Child {
  title: string;
  icon: string;
  to: string;
}

export interface Services {
  name: string;
  id: string;
}
