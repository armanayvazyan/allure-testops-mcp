import { AxiosInstance } from 'axios';

export class TestResultSearchController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async searchTestResults(query: string, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testresult/search`, {
      params: {
        projectId: this.projectId,
        query,
        ...params
      },
    });
    return response.data;
  }
}
