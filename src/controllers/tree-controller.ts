import { AxiosInstance } from 'axios';

export class TreeController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getTestCaseTree(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/tree`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getTestCaseTreeNode(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/tree/${id}`);
    return response.data;
  }
}
