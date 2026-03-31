// src/types/index.ts
export interface IExperience {
  name: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = current/present
  description: string[];
  tags?: string[];
}

export interface IEducation {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface IProject {
  title: string;
  isFeatured?: boolean;
  thumbnail?: string;
  thumbnailGradient?: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface IInfo {
  baseUrl: string;
  name: string;
  jobDescription: string;
  about: string;
  experience: IExperience[];
  education: IEducation[];
  socialMedia: {
    twitter?: string;
    github?: string;
    email?: string;
    linkedin?: string;
  };
  projects: IProject[];
}
