import { AxiosInstance } from 'axios';

export class ExportController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async exportToPDF(params?: any): Promise<any> {
    const response = await this.client.post(`/api/rs/export/pdf`, { ...params, projectId: this.projectId });
    return response.data;
  }

  async exportToCSV(params?: any): Promise<any> {
    const response = await this.client.post(`/api/rs/export/csv`, { ...params, projectId: this.projectId });
    return response.data;
  }

  async exportToExcel(params?: any): Promise<any> {
    const response = await this.client.post(`/api/rs/export/excel`, { ...params, projectId: this.projectId });
    return response.data;
  }

  async getExportStatus(id: string): Promise<any> {
    const response = await this.client.get(`/api/rs/export/${id}`);
    return response.data;
  }

  async downloadExport(id: string): Promise<any> {
    const response = await this.client.get(`/api/rs/export/${id}/download`, { responseType: 'blob' });
    return response.data;
  }
}
