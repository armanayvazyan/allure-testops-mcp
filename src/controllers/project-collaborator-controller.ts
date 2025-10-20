import { AxiosInstance } from 'axios';

export interface Collaborator {
  userId: number;
  role?: string;
}

export class ProjectCollaboratorController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getCollaborators(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/collaborator`, {
      params,
    });
    return response.data;
  }

  async addCollaborator(collaborator: Collaborator): Promise<any> {
    const response = await this.client.post(
      `/api/rs/project/${this.projectId}/collaborator`,
      collaborator
    );
    return response.data;
  }

  async removeCollaborator(userId: number): Promise<void> {
    await this.client.delete(`/api/rs/project/${this.projectId}/collaborator/${userId}`);
  }
}
