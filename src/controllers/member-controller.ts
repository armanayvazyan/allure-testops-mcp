import { AxiosInstance } from 'axios';

export interface Member {
  id?: number;
  userId?: number;
  role?: string;
  permissions?: string[];
}

export class MemberController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getMembers(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/member`, {
      params,
    });
    return response.data;
  }

  async getMember(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/member/${id}`);
    return response.data;
  }

  async addMember(member: Member): Promise<any> {
    const response = await this.client.post(`/api/rs/project/${this.projectId}/member`, member);
    return response.data;
  }

  async updateMember(id: number, member: Partial<Member>): Promise<any> {
    const response = await this.client.patch(`/api/rs/project/${this.projectId}/member/${id}`, member);
    return response.data;
  }

  async removeMember(id: number): Promise<void> {
    await this.client.delete(`/api/rs/project/${this.projectId}/member/${id}`);
  }
}
