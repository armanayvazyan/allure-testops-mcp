import { AxiosInstance } from 'axios';

export interface ProjectProperty {
  key: string;
  value: any;
}

export class ProjectPropertyController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getProperties(): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/property`);
    return response.data;
  }

  async getProperty(key: string): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/property/${key}`);
    return response.data;
  }

  async setProperty(property: ProjectProperty): Promise<any> {
    const response = await this.client.post(
      `/api/rs/project/${this.projectId}/property`,
      property
    );
    return response.data;
  }

  async updateProperty(key: string, value: any): Promise<any> {
    const response = await this.client.patch(`/api/rs/project/${this.projectId}/property/${key}`, {
      value,
    });
    return response.data;
  }

  async deleteProperty(key: string): Promise<void> {
    await this.client.delete(`/api/rs/project/${this.projectId}/property/${key}`);
  }
}
