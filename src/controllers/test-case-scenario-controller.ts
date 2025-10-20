import { AxiosInstance } from 'axios';

export interface Scenario {
  id?: number;
  name: string;
  steps?: any[];
}

export class TestCaseScenarioController {
  constructor(private client: AxiosInstance) {}

  async getScenarios(testCaseId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/${testCaseId}/scenario`);
    return response.data;
  }

  async getScenario(testCaseId: number, scenarioId: number): Promise<any> {
    const response = await this.client.get(
      `/api/rs/testcase/${testCaseId}/scenario/${scenarioId}`
    );
    return response.data;
  }

  async createScenario(testCaseId: number, scenario: Scenario): Promise<any> {
    const response = await this.client.post(
      `/api/rs/testcase/${testCaseId}/scenario`,
      scenario
    );
    return response.data;
  }

  async updateScenario(
    testCaseId: number,
    scenarioId: number,
    scenario: Partial<Scenario>
  ): Promise<any> {
    const response = await this.client.patch(
      `/api/rs/testcase/${testCaseId}/scenario/${scenarioId}`,
      scenario
    );
    return response.data;
  }

  async deleteScenario(testCaseId: number, scenarioId: number): Promise<void> {
    await this.client.delete(`/api/rs/testcase/${testCaseId}/scenario/${scenarioId}`);
  }
}
