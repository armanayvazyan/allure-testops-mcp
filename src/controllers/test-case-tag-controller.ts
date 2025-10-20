import { AxiosInstance } from 'axios';

export interface Tag {
  id?: number;
  name: string;
}

export class TestCaseTagController {
  constructor(private client: AxiosInstance) {}

  async getTags(testCaseId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/tag`);
    return response.data;
  }

  async addTag(testCaseId: number, tag: Tag): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/${testCaseId}/tag`, tag);
    return response.data;
  }

  async removeTag(testCaseId: number, tagId: number): Promise<void> {
    await this.client.delete(`/api/rs/testcase/${testCaseId}/tag/${tagId}`);
  }
}
