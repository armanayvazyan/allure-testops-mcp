# Workflow Example

## Example User Prompt

`In project 37, create a launch, attach a test plan, check failed results, and assign failures to qa.user.`

## Typical Tool Sequence

1. `create_launch`
2. `add_test_plan_to_launch`
3. `list_test_results`
4. `assign_test_result`
5. `get_launch_statistic`

## Example Calls

Create launch:

```json
{
  "name": "create_launch",
  "arguments": {
    "payload": {
      "projectId": 37,
      "name": "Nightly Regression - 2026-03-03"
    }
  }
}
```

Attach plan:

```json
{
  "name": "add_test_plan_to_launch",
  "arguments": {
    "id": 9981,
    "payload": {
      "id": 782
    }
  }
}
```

List failed results:

```json
{
  "name": "search_test_results",
  "arguments": {
    "projectId": 37,
    "rql": "launchId == 9981 and status == FAILED",
    "page": 0,
    "size": 20
  }
}
```
