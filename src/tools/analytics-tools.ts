import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { AllureClient } from '../allure-client.js';

export const analyticsTools: Tool[] = [
  {
    name: 'get_automation_chart',
    description: 'Get automation trend chart data',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Analytics ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_statistic_trend',
    description: 'Get status statistics trend over time',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Analytics ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_test_case_success_rate',
    description: 'Get test case success rate metrics',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Analytics ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_launch_duration_histogram',
    description: 'Get launch duration distribution',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Analytics ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_mute_trend',
    description: 'Get muted tests analysis trend',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Analytics ID' },
      },
      required: ['id'],
    },
  },
];

export async function handleAnalyticsTools(name: string, args: any, client: AllureClient): Promise<any> {
  switch (name) {
    case 'get_automation_chart': {
      const { id } = args;
      const result = await client.analytics.getAutomationChart(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'get_statistic_trend': {
      const { id } = args;
      const result = await client.analytics.getStatisticTrend(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'get_test_case_success_rate': {
      const { id } = args;
      const result = await client.analytics.getTestCaseSuccessRate(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'get_launch_duration_histogram': {
      const { id } = args;
      const result = await client.analytics.getLaunchDurationHistogram(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'get_mute_trend': {
      const { id } = args;
      const result = await client.analytics.getMuteTrend(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    default:
      return null;
  }
}
