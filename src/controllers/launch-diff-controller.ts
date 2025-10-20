import { AxiosInstance } from 'axios';

export class LaunchDiffController {
  constructor(private client: AxiosInstance) {}

  async compareLaunches(launchId1: number, launchId2: number): Promise<any> {
    const response = await this.client.get(`/api/rs/launch/${launchId1}/diff/${launchId2}`);
    return response.data;
  }

  async getDiffSummary(launchId1: number, launchId2: number): Promise<any> {
    const response = await this.client.get(
      `/api/rs/launch/${launchId1}/diff/${launchId2}/summary`
    );
    return response.data;
  }
}
