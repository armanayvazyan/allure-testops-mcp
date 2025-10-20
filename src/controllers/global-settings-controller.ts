import { AxiosInstance } from 'axios';

export class GlobalSettingsController {
  constructor(private client: AxiosInstance) {}

  async getAll(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/globalsettings`, { params });
    return response.data;
  }

  async get(key: string): Promise<any> {
    const response = await this.client.get(`/api/rs/globalsettings/${key}`);
    return response.data;
  }

  async update(key: string, value: any): Promise<any> {
    const response = await this.client.put(`/api/rs/globalsettings/${key}`, { value });
    return response.data;
  }

  async delete(key: string): Promise<void> {
    await this.client.delete(`/api/rs/globalsettings/${key}`);
  }
}
