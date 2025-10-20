import { AxiosInstance } from 'axios';

export interface TestResult {
  id?: number;
  name?: string;
  status?: string;
  statusDetails?: string;
  time?: {
    start?: number;
    stop?: number;
    duration?: number;
  };
}

export class TestResultController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getTestResults(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testresult`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getTestResult(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testresult/${id}`);
    return response.data;
  }

  async createTestResult(testResult: TestResult): Promise<any> {
    const response = await this.client.post(`/api/rs/testresult`, {
      ...testResult,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateTestResult(id: number, testResult: Partial<TestResult>): Promise<any> {
    const response = await this.client.patch(`/api/rs/testresult/${id}`, testResult);
    return response.data;
  }

  async deleteTestResult(id: number): Promise<void> {
    await this.client.delete(`/api/rs/testresult/${id}`);
  }
}
