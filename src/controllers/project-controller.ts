import { AxiosInstance } from 'axios';

export interface Project {
  id?: number;
  name: string;
  description?: string;
  active?: boolean;
}

export class ProjectController {
  constructor(private client: AxiosInstance) {}

  async getProjects(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/project`, { params });
    return response.data;
  }

  async getProject(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${id}`);
    return response.data;
  }

  async createProject(project: Project): Promise<any> {
    const response = await this.client.post(`/api/rs/project`, project);
    return response.data;
  }

  async updateProject(id: number, project: Partial<Project>): Promise<any> {
    const response = await this.client.patch(`/api/rs/project/${id}`, project);
    return response.data;
  }

  async deleteProject(id: number): Promise<void> {
    await this.client.delete(`/api/rs/project/${id}`);
  }
}
