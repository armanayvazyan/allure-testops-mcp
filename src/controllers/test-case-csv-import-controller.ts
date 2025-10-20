import { AxiosInstance } from 'axios';

export class TestCaseCsvImportController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async importFromCsv(file: any, params?: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post(`/api/rs/testcase/import/csv`, formData, {
      params: { projectId: this.projectId, ...params },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getImportStatus(importId: string): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/import/csv/${importId}`);
    return response.data;
  }
}
