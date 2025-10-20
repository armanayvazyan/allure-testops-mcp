import { AxiosInstance } from 'axios';

export class TestCaseAuditController {
  constructor(private client: AxiosInstance) {}

  async getAuditLog(testCaseId: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/audit`, { params });
    return response.data;
  }

  async getAuditEntry(testCaseId: number, auditId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/audit/${auditId}`);
    return response.data;
  }
}
