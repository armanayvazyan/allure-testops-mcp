import { AxiosInstance } from 'axios';

export interface ProjectSettings {
  [key: string]: any;
}

export class ProjectSettingsController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getSettings(): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/settings`);
    return response.data;
  }

  async updateSettings(settings: ProjectSettings): Promise<any> {
    const response = await this.client.patch(
      `/api/rs/project/${this.projectId}/settings`,
      settings
    );
    return response.data;
  }

  async getSetting(key: string): Promise<any> {
    const response = await this.client.get(
      `/api/rs/project/${this.projectId}/settings/${key}`
    );
    return response.data;
  }

  async updateSetting(key: string, value: any): Promise<any> {
    const response = await this.client.patch(
      `/api/rs/project/${this.projectId}/settings/${key}`,
      { value }
    );
    return response.data;
  }
}
