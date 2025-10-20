import { AxiosInstance } from 'axios';

export class TestResultBulkController {
  constructor(private client: AxiosInstance) {}

  async bulkUpdateTestResults(testResultIds: number[], update: any): Promise<any> {
    const response = await this.client.post(`/api/rs/testresult/bulk/update`, {
      ids: testResultIds,
      ...update,
    });
    return response.data;
  }

  async bulkDeleteTestResults(testResultIds: number[]): Promise<any> {
    const response = await this.client.post(`/api/rs/testresult/bulk/delete`, {
      ids: testResultIds,
    });
    return response.data;
  }
}
