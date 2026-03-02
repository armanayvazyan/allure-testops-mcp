# Usage Examples

This folder contains prompt-oriented examples for using the Allure TestOps MCP server from an AI assistant.

Each guide includes:
- a user prompt you can copy/adapt
- the MCP tools typically used
- example argument shapes
- notes for common variations

## Example Guides

- [Test Cases](./test-cases.md)
- [Launches](./launches.md)
- [Test Results](./test-results.md)
- [Test Plans](./test-plans.md)
- [Custom Fields](./custom-fields.md)
- [Workflows](./workflows.md)

## Project Scope Inputs

For project-scoped operations, use one of:
- `projectId`
- `projectName`
- environment default `ALLURE_PROJECT_ID`

If `ALLURE_PROJECT_ID` is configured in your MCP server environment, many prompts can omit project scope arguments.
