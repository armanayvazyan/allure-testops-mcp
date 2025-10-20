import { AxiosInstance } from 'axios';

export class TestCaseSearchController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async searchTestCasesByAQL(aql: string, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase`, {
      params: {
        projectId: this.projectId,
        aql,
        ...params
      },
    });
    return response.data;
  }
}
