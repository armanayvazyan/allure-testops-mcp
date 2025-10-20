import { AxiosInstance } from 'axios';

export class ProjectMetricController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getMetrics(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/metrics`, {
      params,
    });
    return response.data;
  }

  async getMetric(metricName: string, params?: any): Promise<any> {
    const response = await this.client.get(
      `/api/rs/project/${this.projectId}/metrics/${metricName}`,
      { params }
    );
    return response.data;
  }

  async getTestCaseMetrics(): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/metrics/testcases`);
    return response.data;
  }

  async getLaunchMetrics(): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/metrics/launches`);
    return response.data;
  }
}
