import { AxiosInstance } from 'axios';

export class TestCaseCustomFieldController {
  constructor(private client: AxiosInstance) {}

  async getCustomFields(testCaseId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/customfield`);
    return response.data;
  }

  async setCustomField(testCaseId: number, customFieldId: number, value: any): Promise<any> {
    const response = await this.client.post(
      `/api/rs/testcase/${testCaseId}/customfield/${customFieldId}`,
      { value }
    );
    return response.data;
  }

  async deleteCustomField(testCaseId: number, customFieldId: number): Promise<void> {
    await this.client.delete(`/api/rs/testcase/${testCaseId}/customfield/${customFieldId}`);
  }
}
