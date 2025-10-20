import { AxiosInstance } from 'axios';

export interface Attachment {
  id?: number;
  name?: string;
  type?: string;
  size?: number;
}

export class TestCaseAttachmentController {
  constructor(private client: AxiosInstance) {}

  async getAttachments(testCaseId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/attachment`);
    return response.data;
  }

  async getAttachment(testCaseId: number, attachmentId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/attachment/${attachmentId}`);
    return response.data;
  }

  async addAttachment(testCaseId: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post(
      `/api/rs/testcase/${testCaseId}/attachment`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async deleteAttachment(testCaseId: number, attachmentId: number): Promise<void> {
    await this.client.delete(`/api/rs/testcase/${testCaseId}/attachment/${attachmentId}`);
  }
}
