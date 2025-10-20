import { AxiosInstance } from 'axios';

export interface TestCase {
  id?: number;
  name: string;
  description?: string;
  status?: string;
  automated?: boolean;
  external?: boolean;
  deleted?: boolean;
}

export class TestCaseController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getTestCases(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getTestCase(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${id}`);
    return response.data;
  }

  async createTestCase(testCase: TestCase): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase`, {
      ...testCase,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateTestCase(id: number, testCase: Partial<TestCase>): Promise<any> {
    const response = await this.client.patch(`/api/rs/testcase/${id}`, testCase);
    return response.data;
  }

  async deleteTestCase(id: number): Promise<void> {
    await this.client.delete(`/api/rs/testcase/${id}`);
  }

  async bulkCreateTestCases(testCases: TestCase[]): Promise<any> {
    const results = [];
    for (const testCase of testCases) {
      try {
        const result = await this.createTestCase(testCase);
        results.push({ success: true, data: result });
      } catch (error: any) {
        results.push({ success: false, error: error.message, testCase });
      }
    }
    return results;
  }
}
