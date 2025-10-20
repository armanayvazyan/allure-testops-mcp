import { AxiosInstance } from 'axios';

export interface AccessRule {
  userId?: number;
  groupId?: number;
  role: string;
}

export class ProjectAccessController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getAccessRules(): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/access`);
    return response.data;
  }

  async addAccessRule(rule: AccessRule): Promise<any> {
    const response = await this.client.post(`/api/rs/project/${this.projectId}/access`, rule);
    return response.data;
  }

  async updateAccessRule(ruleId: number, rule: Partial<AccessRule>): Promise<any> {
    const response = await this.client.patch(
      `/api/rs/project/${this.projectId}/access/${ruleId}`,
      rule
    );
    return response.data;
  }

  async deleteAccessRule(ruleId: number): Promise<void> {
    await this.client.delete(`/api/rs/project/${this.projectId}/access/${ruleId}`);
  }
}
