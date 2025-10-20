import { AxiosInstance } from 'axios';

export interface Launch {
  id?: number;
  name: string;
  closed?: boolean;
  running?: boolean;
}

export class LaunchController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getLaunches(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/launch`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getLaunch(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/launch/${id}`);
    return response.data;
  }

  async createLaunch(launch: Launch): Promise<any> {
    const response = await this.client.post(`/api/rs/launch`, {
      ...launch,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateLaunch(id: number, launch: Partial<Launch>): Promise<any> {
    const response = await this.client.patch(`/api/rs/launch/${id}`, launch);
    return response.data;
  }

  async deleteLaunch(id: number): Promise<void> {
    await this.client.delete(`/api/rs/launch/${id}`);
  }

  async closeLaunch(id: number): Promise<any> {
    const response = await this.client.post(`/api/rs/launch/${id}/close`);
    return response.data;
  }
}
