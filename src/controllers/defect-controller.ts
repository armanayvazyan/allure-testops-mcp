import { AxiosInstance } from 'axios';

export interface Defect {
  id?: number;
  name: string;
  description?: string;
  status?: string;
}

export class DefectController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async create(defect: Defect): Promise<any> {
    const response = await this.client.post(`/api/rs/defect`, { ...defect, projectId: this.projectId });
    return response.data;
  }

  async get(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/defect/${id}`);
    return response.data;
  }

  async update(id: number, defect: Partial<Defect>): Promise<any> {
    const response = await this.client.patch(`/api/rs/defect/${id}`, defect);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/rs/defect/${id}`);
  }

  async bulkClose(ids: number[]): Promise<any> {
    const response = await this.client.post(`/api/rs/defect/bulk/close`, ids);
    return response.data;
  }

  async createIssue(id: number, issueData: any): Promise<any> {
    const response = await this.client.post(`/api/rs/defect/${id}/createissue`, issueData);
    return response.data;
  }

  async createMatcher(matcherData: any): Promise<any> {
    const response = await this.client.post(`/api/rs/defect/matcher`, matcherData);
    return response.data;
  }
}
