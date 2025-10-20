import { AxiosInstance } from 'axios';

export interface TreeNode {
  id?: number;
  name: string;
  parentId?: number;
}

export class TestCaseTreeController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getTree(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/tree`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getTreeNode(nodeId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/testcase/tree/${nodeId}`);
    return response.data;
  }

  async createTreeNode(node: TreeNode): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/tree`, {
      ...node,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateTreeNode(nodeId: number, node: Partial<TreeNode>): Promise<any> {
    const response = await this.client.patch(`/api/rs/testcase/tree/${nodeId}`, node);
    return response.data;
  }

  async deleteTreeNode(nodeId: number): Promise<void> {
    await this.client.delete(`/api/rs/testcase/tree/${nodeId}`);
  }

  async moveTreeNode(nodeId: number, newParentId: number): Promise<any> {
    const response = await this.client.post(`/api/rs/testcase/tree/${nodeId}/move`, {
      newParentId,
    });
    return response.data;
  }
}
