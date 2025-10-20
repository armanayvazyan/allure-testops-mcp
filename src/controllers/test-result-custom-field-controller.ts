import { AxiosInstance } from 'axios';

export class TestResultCustomFieldController {
  constructor(private client: AxiosInstance) {}

  async getCustomFields(testResultId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testresult/${testResultId}/customfield`);
    return response.data;
  }

  async setCustomField(testResultId: number, customFieldId: number, value: any): Promise<any> {
    const response = await this.client.post(
      `/api/rs/testresult/${testResultId}/customfield/${customFieldId}`,
      { value }
    );
    return response.data;
  }

  async deleteCustomField(testResultId: number, customFieldId: number): Promise<void> {
    await this.client.delete(`/api/rs/testresult/${testResultId}/customfield/${customFieldId}`);
  }
}
