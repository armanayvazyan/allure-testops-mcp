import { AxiosInstance } from 'axios';

export interface Comment {
  id?: number;
  text: string;
  testCaseId?: number;
  testResultId?: number;
}

export class CommentController {
  constructor(private client: AxiosInstance) {}

  async getAll(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/comment`, { params });
    return response.data;
  }

  async get(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/comment/${id}`);
    return response.data;
  }

  async create(comment: Comment): Promise<any> {
    const response = await this.client.post(`/api/rs/comment`, comment);
    return response.data;
  }

  async update(id: number, comment: Partial<Comment>): Promise<any> {
    const response = await this.client.patch(`/api/rs/comment/${id}`, comment);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/rs/comment/${id}`);
  }
}
