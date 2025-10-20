import { AxiosInstance } from 'axios';

export class CustomFieldProjectController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getProjectCustomFields(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/customfield`, {
      params,
    });
    return response.data;
  }

  async assignCustomField(customFieldId: number): Promise<any> {
    const response = await this.client.post(
      `/api/rs/project/${this.projectId}/customfield/${customFieldId}`
    );
    return response.data;
  }

  async unassignCustomField(customFieldId: number): Promise<void> {
    await this.client.delete(`/api/rs/project/${this.projectId}/customfield/${customFieldId}`);
  }
}
