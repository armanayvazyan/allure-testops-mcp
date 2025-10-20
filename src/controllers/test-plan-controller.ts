import { AxiosInstance } from 'axios';

export interface TestPlan {
  id?: number;
  name: string;
  description?: string;
}

export class TestPlanController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getTestPlans(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testplan`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getTestPlan(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testplan/${id}`);
    return response.data;
  }

  async createTestPlan(testPlan: TestPlan): Promise<any> {
    const response = await this.client.post(`/api/rs/testplan`, {
      ...testPlan,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateTestPlan(id: number, testPlan: Partial<TestPlan>): Promise<any> {
    const response = await this.client.patch(`/api/rs/testplan/${id}`, testPlan);
    return response.data;
  }

  async deleteTestPlan(id: number): Promise<void> {
    await this.client.delete(`/api/rs/testplan/${id}`);
  }
}
