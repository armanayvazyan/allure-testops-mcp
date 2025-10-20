import { AxiosInstance } from 'axios';

export interface AccessGroup {
  id?: number;
  name: string;
  description?: string;
}

export class AccessGroupController {
  constructor(private client: AxiosInstance) {}

  async getAll(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/accessgroup`, { params });
    return response.data;
  }

  async get(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/accessgroup/${id}`);
    return response.data;
  }

  async create(group: AccessGroup): Promise<any> {
    const response = await this.client.post(`/api/rs/accessgroup`, group);
    return response.data;
  }

  async update(id: number, group: Partial<AccessGroup>): Promise<any> {
    const response = await this.client.patch(`/api/rs/accessgroup/${id}`, group);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/rs/accessgroup/${id}`);
  }

  async bulkDelete(ids: number[]): Promise<void> {
    await this.client.post(`/api/rs/accessgroup/bulk/delete`, ids);
  }

  async suggest(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/accessgroup/suggest`, { params });
    return response.data;
  }

  async getUsers(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/accessgroup/${id}/user`, { params });
    return response.data;
  }

  async addUsers(id: number, userIds: number[]): Promise<any> {
    const response = await this.client.post(`/api/rs/accessgroup/${id}/user`, userIds);
    return response.data;
  }

  async removeUsers(id: number, userIds: number[]): Promise<void> {
    await this.client.delete(`/api/rs/accessgroup/${id}/user`, { data: userIds });
  }

  async getProjects(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/accessgroup/${id}/project`, { params });
    return response.data;
  }

  async addProjects(id: number, projectIds: number[]): Promise<any> {
    const response = await this.client.post(`/api/rs/accessgroup/${id}/project`, projectIds);
    return response.data;
  }

  async removeProjects(id: number, projectIds: number[]): Promise<void> {
    await this.client.delete(`/api/rs/accessgroup/${id}/project`, { data: projectIds });
  }
}
