import { AxiosInstance } from 'axios';

export class LaunchSearchController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async searchLaunches(query: string, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/launch/search`, {
      params: {
        projectId: this.projectId,
        query,
        ...params
      },
    });
    return response.data;
  }
}
