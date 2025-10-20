import { AxiosInstance } from 'axios';

export class TestCaseExportController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async exportToCsv(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/export/csv`, {
      params: { projectId: this.projectId, ...params },
      responseType: 'blob',
    });
    return response.data;
  }

  async exportToExcel(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/export/excel`, {
      params: { projectId: this.projectId, ...params },
      responseType: 'blob',
    });
    return response.data;
  }

  async exportToJson(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/export/json`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }
}
