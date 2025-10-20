import { AxiosInstance } from 'axios';

export class TestCaseSyncController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async syncTestCases(syncConfig: any): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/sync`, {
      projectId: parseInt(this.projectId),
      ...syncConfig,
    });
    return response.data;
  }

  async getSyncStatus(syncId: string): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/sync/${syncId}`);
    return response.data;
  }
}
