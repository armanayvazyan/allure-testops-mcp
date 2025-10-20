import { AxiosInstance } from 'axios';

export interface TestLayer {
  id?: number;
  name: string;
  description?: string;
}

export class TestLayerController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getTestLayers(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testlayer`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getTestLayer(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testlayer/${id}`);
    return response.data;
  }

  async createTestLayer(testLayer: TestLayer): Promise<any> {
    const response = await this.client.post(`/api/rs/testlayer`, {
      ...testLayer,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateTestLayer(id: number, testLayer: Partial<TestLayer>): Promise<any> {
    const response = await this.client.patch(`/api/rs/testlayer/${id}`, testLayer);
    return response.data;
  }

  async deleteTestLayer(id: number): Promise<void> {
    await this.client.delete(`/api/rs/testlayer/${id}`);
  }
}
