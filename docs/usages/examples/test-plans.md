# Test Plans Example

## Example User Prompt

`Create a smoke test plan in project 37 and run it in a new launch.`

## Typical Tools

- `list_test_plans`
- `create_test_plan`
- `update_test_plan`
- `run_test_plan`
- `delete_test_plan`

## Example Calls

Create:

```json
{
  "name": "create_test_plan",
  "arguments": {
    "payload": {
      "projectId": 37,
      "name": "Smoke Plan - Web"
    }
  }
}
```

List:

```json
{
  "name": "list_test_plans",
  "arguments": {
    "projectId": 37,
    "search": "Smoke",
    "page": 0,
    "size": 20
  }
}
```

Run:

```json
{
  "name": "run_test_plan",
  "arguments": {
    "id": 782,
    "payload": {
      "name": "Smoke Launch - 2026-03-03"
    }
  }
}
```
