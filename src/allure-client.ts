import axios, { AxiosInstance } from 'axios';

export interface AllureConfig {
  baseUrl: string;
  token: string;
  projectId: string;
}

export interface TestCase {
  id?: number;
  name: string;
  description?: string;
  status?: string;
  automated?: boolean;
  external?: boolean;
  deleted?: boolean;
}

export interface Launch {
  id?: number;
  name: string;
  closed?: boolean;
  running?: boolean;
}

export interface TestPlan {
  id?: number;
  name: string;
  description?: string;
}

export class AllureClient {
  private client: AxiosInstance;
  private projectId: string;

  constructor(config: AllureConfig) {
    this.projectId = config.projectId;
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Authorization': `Api-Token ${config.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Test Case CRUD
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

  // Launch CRUD
  async getLaunches(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/launch`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getLaunch(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/launch/${id}`);
    return response.data;
  }

  async createLaunch(launch: Launch): Promise<any> {
    const response = await this.client.post(`/api/rs/launch`, {
      ...launch,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateLaunch(id: number, launch: Partial<Launch>): Promise<any> {
    const response = await this.client.patch(`/api/rs/launch/${id}`, launch);
    return response.data;
  }

  async deleteLaunch(id: number): Promise<void> {
    await this.client.delete(`/api/rs/launch/${id}`);
  }

  async closeLaunch(id: number): Promise<any> {
    const response = await this.client.post(`/api/rs/launch/${id}/close`);
    return response.data;
  }

  // Test Plan CRUD
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
