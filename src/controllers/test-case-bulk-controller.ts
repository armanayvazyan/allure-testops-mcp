import { AxiosInstance } from 'axios';

export class TestCaseBulkController {
  constructor(private client: AxiosInstance) {}

  async bulkUpdateTestCases(testCaseIds: number[], update: any): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/bulk/update`, {
      ids: testCaseIds,
      ...update,
    });
    return response.data;
  }

  async bulkDeleteTestCases(testCaseIds: number[]): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/bulk/delete`, {
      ids: testCaseIds,
    });
    return response.data;
  }

  async bulkMoveTestCases(testCaseIds: number[], targetTreeId: number): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/bulk/move`, {
      ids: testCaseIds,
      targetTreeId,
    });
    return response.data;
  }
}
