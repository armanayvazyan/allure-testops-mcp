import { AxiosInstance } from 'axios';

export interface Widget {
  id?: number;
  name: string;
  type?: string;
  config?: any;
  dashboardId?: number;
}

export class WidgetController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getWidgets(dashboardId: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/dashboard/${dashboardId}/widget`, {
      params,
    });
    return response.data;
  }

  async getWidget(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/widget/${id}`);
    return response.data;
  }

  async createWidget(widget: Widget): Promise<any> {
    const response = await this.client.post(`/api/rs/widget`, widget);
    return response.data;
  }

  async updateWidget(id: number, widget: Partial<Widget>): Promise<any> {
    const response = await this.client.patch(`/api/rs/widget/${id}`, widget);
    return response.data;
  }

  async deleteWidget(id: number): Promise<void> {
    await this.client.delete(`/api/rs/widget/${id}`);
  }
}
