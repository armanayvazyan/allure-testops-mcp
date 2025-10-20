import { AxiosInstance } from 'axios';

export interface Issue {
  id?: number;
  name?: string;
  url?: string;
  status?: string;
}

export class LaunchIssueController {
  constructor(private client: AxiosInstance) {}

  async getIssues(launchId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/launch/${launchId}/issue`);
    return response.data;
  }

  async linkIssue(launchId: number, issue: Issue): Promise<any> {
    const response = await this.client.post(`/api/rs/launch/${launchId}/issue`, issue);
    return response.data;
  }

  async unlinkIssue(launchId: number, issueId: number): Promise<void> {
    await this.client.delete(`/api/rs/launch/${launchId}/issue/${issueId}`);
  }
}
