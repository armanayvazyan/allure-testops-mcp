import { AxiosInstance } from 'axios';

export class TestCaseOverviewController {
  constructor(private client: AxiosInstance) {}

  async getOverview(testCaseId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/overview`);
    return response.data;
  }

  async getStatistics(testCaseId: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/statistics`, {
      params,
    });
    return response.data;
  }
}
