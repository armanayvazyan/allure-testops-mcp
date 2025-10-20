import { AxiosInstance } from 'axios';

export class TestCaseTreeSelectionController {
  constructor(private client: AxiosInstance) {}

  async selectTestCases(treeNodeId: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/tree/${treeNodeId}/testcases`, {
      params,
    });
    return response.data;
  }

  async selectAllTestCases(treeNodeId: number, recursive: boolean = false): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/tree/${treeNodeId}/all`, {
      params: { recursive },
    });
    return response.data;
  }
}
