import { AxiosInstance } from 'axios';

export class TestCaseBulkControllerV2 {
  constructor(private client: AxiosInstance) {}

  async bulkUpdateTestCasesV2(updates: any[]): Promise<any> {
    const response = await this.client.post(`/api/rs/v2/testcase/bulk/update`, { updates });
    return response.data;
  }

  async bulkDeleteTestCasesV2(testCaseIds: number[], permanent: boolean = false): Promise<any> {
    const response = await this.client.post(`/api/rs/v2/testcase/bulk/delete`, {
      ids: testCaseIds,
      permanent,
    });
    return response.data;
  }

  async bulkMoveTestCasesV2(testCaseIds: number[], targetTreeId: number): Promise<any> {
    const response = await this.client.post(`/api/rs/v2/testcase/bulk/move`, {
      ids: testCaseIds,
      targetTreeId,
    });
    return response.data;
  }

  async bulkTagTestCasesV2(testCaseIds: number[], tags: string[]): Promise<any> {
    const response = await this.client.post(`/api/rs/v2/testcase/bulk/tag`, {
      ids: testCaseIds,
      tags,
    });
    return response.data;
  }
}
