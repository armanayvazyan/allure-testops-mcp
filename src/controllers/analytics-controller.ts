import { AxiosInstance } from 'axios';

export class AnalyticsController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async getAutomationChart(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/analytic/${id}/automation_chart`, { params });
    return response.data;
  }

  async getStatisticTrend(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/analytic/${id}/statistic_trend`, { params });
    return response.data;
  }

  async getTestCaseSuccessRate(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/analytic/${id}/tc_success_rate`, { params });
    return response.data;
  }

  async getLaunchDurationHistogram(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/analytic/${id}/launch_duration_histogram`, { params });
    return response.data;
  }

  async getMuteTrend(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/analytic/${id}/mute_trend`, { params });
    return response.data;
  }

  async getGroupByStatus(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/analytic/${id}/group_by_status`, { params });
    return response.data;
  }

  async getGroupByAutomation(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/analytic/${id}/group_by_automation`, { params });
    return response.data;
  }

  async getTestCaseLastResult(id: number, params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/analytic/${id}/tc_last_result`, { params });
    return response.data;
  }
}
