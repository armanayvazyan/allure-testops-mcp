import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { AllureClient } from '../allure-client.js';

export const accessGroupTools: Tool[] = [
  {
    name: 'list_access_groups',
    description: 'List all access groups',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number', description: 'Page number (optional)' },
        size: { type: 'number', description: 'Page size (optional)' },
      },
    },
  },
  {
    name: 'get_access_group',
    description: 'Get a specific access group by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'create_access_group',
    description: 'Create a new access group',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Group name' },
        description: { type: 'string', description: 'Group description (optional)' },
      },
      required: ['name'],
    },
  },
  {
    name: 'update_access_group',
    description: 'Update an existing access group',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
        name: { type: 'string', description: 'Group name (optional)' },
        description: { type: 'string', description: 'Group description (optional)' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_access_group',
    description: 'Delete an access group',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'bulk_delete_access_groups',
    description: 'Bulk delete multiple access groups',
    inputSchema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'number' }, description: 'Array of access group IDs' },
      },
      required: ['ids'],
    },
  },
  {
    name: 'get_access_group_users',
    description: 'Get users in an access group',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'add_access_group_users',
    description: 'Add users to an access group',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
        userIds: { type: 'array', items: { type: 'number' }, description: 'Array of user IDs' },
      },
      required: ['id', 'userIds'],
    },
  },
  {
    name: 'remove_access_group_users',
    description: 'Remove users from an access group',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
        userIds: { type: 'array', items: { type: 'number' }, description: 'Array of user IDs' },
      },
      required: ['id', 'userIds'],
    },
  },
  {
    name: 'get_access_group_projects',
    description: 'Get projects in an access group',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'add_access_group_projects',
    description: 'Add projects to an access group',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
        projectIds: { type: 'array', items: { type: 'number' }, description: 'Array of project IDs' },
      },
      required: ['id', 'projectIds'],
    },
  },
  {
    name: 'remove_access_group_projects',
    description: 'Remove projects from an access group',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Access group ID' },
        projectIds: { type: 'array', items: { type: 'number' }, description: 'Array of project IDs' },
      },
      required: ['id', 'projectIds'],
    },
  },
];

export async function handleAccessGroupTools(name: string, args: any, client: AllureClient): Promise<any> {
  switch (name) {
    case 'list_access_groups': {
      const result = await client.accessGroup.getAll(args || {});
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'get_access_group': {
      const { id } = args;
      const result = await client.accessGroup.get(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'create_access_group': {
      const result = await client.accessGroup.create(args);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'update_access_group': {
      const { id, ...updateData } = args;
      const result = await client.accessGroup.update(id, updateData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'delete_access_group': {
      const { id } = args;
      await client.accessGroup.delete(id);
      return {
        content: [{ type: 'text', text: 'Access group deleted successfully' }],
      };
    }

    case 'bulk_delete_access_groups': {
      const { ids } = args;
      await client.accessGroup.bulkDelete(ids);
      return {
        content: [{ type: 'text', text: 'Access groups deleted successfully' }],
      };
    }

    case 'get_access_group_users': {
      const { id } = args;
      const result = await client.accessGroup.getUsers(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'add_access_group_users': {
      const { id, userIds } = args;
      const result = await client.accessGroup.addUsers(id, userIds);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'remove_access_group_users': {
      const { id, userIds } = args;
      await client.accessGroup.removeUsers(id, userIds);
      return {
        content: [{ type: 'text', text: 'Users removed from access group successfully' }],
      };
    }

    case 'get_access_group_projects': {
      const { id } = args;
      const result = await client.accessGroup.getProjects(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'add_access_group_projects': {
      const { id, projectIds } = args;
      const result = await client.accessGroup.addProjects(id, projectIds);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'remove_access_group_projects': {
      const { id, projectIds } = args;
      await client.accessGroup.removeProjects(id, projectIds);
      return {
        content: [{ type: 'text', text: 'Projects removed from access group successfully' }],
      };
    }

    default:
      return null;
  }
}
