import { AxiosInstance } from 'axios';

export interface Tag {
  id?: number;
  name: string;
}

export class LaunchTagController {
  constructor(private client: AxiosInstance) {}

  async getTags(launchId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/launch/${launchId}/tag`);
    return response.data;
  }

  async addTag(launchId: number, tag: Tag): Promise<any> {
    const response = await this.client.post(`/api/rs/launch/${launchId}/tag`, tag);
    return response.data;
  }

  async removeTag(launchId: number, tagId: number): Promise<void> {
    await this.client.delete(`/api/rs/launch/${launchId}/tag/${tagId}`);
  }
}
