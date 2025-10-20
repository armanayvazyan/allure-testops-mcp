import { AxiosInstance } from 'axios';

export class CustomFieldValueBulkController {
  constructor(private client: AxiosInstance) {}

  async bulkSetCustomFieldValues(
    entityType: string,
    entityIds: number[],
    customFieldId: number,
    value: any
  ): Promise<any> {
    const response = await this.client.post(
      `/api/rs/${entityType}/customfield/${customFieldId}/bulk`,
      {
        ids: entityIds,
        value,
      }
    );
    return response.data;
  }

  async bulkDeleteCustomFieldValues(
    entityType: string,
    entityIds: number[],
    customFieldId: number
  ): Promise<any> {
    const response = await this.client.delete(
      `/api/rs/${entityType}/customfield/${customFieldId}/bulk`,
      {
        data: { ids: entityIds },
      }
    );
    return response.data;
  }
}
