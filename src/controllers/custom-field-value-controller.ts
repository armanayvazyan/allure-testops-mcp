import { AxiosInstance } from 'axios';

export interface CustomFieldValue {
  id?: number;
  customFieldId: number;
  value: any;
}

export class CustomFieldValueController {
  constructor(private client: AxiosInstance) {}

  async getCustomFieldValues(entityType: string, entityId: number): Promise<any> {
    const response = await this.client.get(
      `/api/rs/${entityType}/${entityId}/customfield/value`
    );
    return response.data;
  }

  async setCustomFieldValue(
    entityType: string,
    entityId: number,
    customFieldId: number,
    value: any
  ): Promise<any> {
    const response = await this.client.post(
      `/api/rs/${entityType}/${entityId}/customfield/${customFieldId}/value`,
      { value }
    );
    return response.data;
  }

  async deleteCustomFieldValue(
    entityType: string,
    entityId: number,
    customFieldId: number
  ): Promise<void> {
    await this.client.delete(
      `/api/rs/${entityType}/${entityId}/customfield/${customFieldId}/value`
    );
  }
}
