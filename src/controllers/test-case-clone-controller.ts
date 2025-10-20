import { AxiosInstance } from 'axios';

export class TestCaseCloneController {
  constructor(private client: AxiosInstance) {}

  async cloneTestCase(testCaseId: number, params?: any): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/${testCaseId}/clone`, params);
    return response.data;
  }

  async cloneTestCases(testCaseIds: number[], targetProjectId?: number): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/clone/bulk`, {
      ids: testCaseIds,
      targetProjectId,
    });
    return response.data;
  }
}
