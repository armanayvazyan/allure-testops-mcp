import { AxiosInstance } from 'axios';

export interface CustomFieldSchema {
  id?: number;
  name: string;
  type: string;
  entityType: string;
  schema?: any;
}

export class CustomFieldSchemaController {
  constructor(private client: AxiosInstance) {}

  async getSchemas(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/customfield/schema`, { params });
    return response.data;
  }

  async getSchema(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/customfield/schema/${id}`);
    return response.data;
  }

  async createSchema(schema: CustomFieldSchema): Promise<any> {
    const response = await this.client.post(`/api/rs/customfield/schema`, schema);
    return response.data;
  }

  async updateSchema(id: number, schema: Partial<CustomFieldSchema>): Promise<any> {
    const response = await this.client.patch(`/api/rs/customfield/schema/${id}`, schema);
    return response.data;
  }

  async deleteSchema(id: number): Promise<void> {
    await this.client.delete(`/api/rs/customfield/schema/${id}`);
  }
}
