import { AxiosInstance } from 'axios';

export interface CustomField {
  id?: number;
  name: string;
  type?: string;
  required?: boolean;
  options?: any[];
}

export class CustomFieldController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getCustomFields(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/customfield`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getCustomField(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/customfield/${id}`);
    return response.data;
  }

  async createCustomField(customField: CustomField): Promise<any> {
    const response = await this.client.post(`/api/rs/customfield`, {
      ...customField,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateCustomField(id: number, customField: Partial<CustomField>): Promise<any> {
    const response = await this.client.patch(`/api/rs/customfield/${id}`, customField);
    return response.data;
  }

  async deleteCustomField(id: number): Promise<void> {
    await this.client.delete(`/api/rs/customfield/${id}`);
  }
}
