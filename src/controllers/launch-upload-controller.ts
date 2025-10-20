import { AxiosInstance } from 'axios';

export class LaunchUploadController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async uploadResults(launchId: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post(`/api/rs/launch/${launchId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async uploadResultsToProject(file: any, params?: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post(`/api/rs/launch/upload`, formData, {
      params: { projectId: this.projectId, ...params },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}
