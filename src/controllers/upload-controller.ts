import { AxiosInstance } from 'axios';

export class UploadController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async uploadFile(file: any, params?: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post(`/api/rs/upload`, formData, {
      params: { projectId: this.projectId, ...params },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getUploads(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/upload`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getUpload(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/upload/${id}`);
    return response.data;
  }

  async deleteUpload(id: number): Promise<void> {
    await this.client.delete(`/api/rs/upload/${id}`);
  }
}
