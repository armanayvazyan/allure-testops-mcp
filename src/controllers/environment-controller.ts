import { AxiosInstance } from 'axios';

export interface Environment {
  id?: number;
  name: string;
  value: string;
}

export class EnvironmentController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async getAll(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/environment`, { params: { ...params, projectId: this.projectId } });
    return response.data;
  }

  async get(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/environment/${id}`);
    return response.data;
  }

  async create(environment: Environment): Promise<any> {
    const response = await this.client.post(`/api/rs/environment`, { ...environment, projectId: this.projectId });
    return response.data;
  }

  async update(id: number, environment: Partial<Environment>): Promise<any> {
    const response = await this.client.patch(`/api/rs/environment/${id}`, environment);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/rs/environment/${id}`);
  }
}

export class EnvironmentVariableController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async getAll(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/ev`, { params: { ...params, projectId: this.projectId } });
    return response.data;
  }

  async get(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/ev/${id}`);
    return response.data;
  }

  async create(variable: any): Promise<any> {
    const response = await this.client.post(`/api/rs/ev`, { ...variable, projectId: this.projectId });
    return response.data;
  }

  async update(id: number, variable: any): Promise<any> {
    const response = await this.client.patch(`/api/rs/ev/${id}`, variable);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/rs/ev/${id}`);
  }
}
