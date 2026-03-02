# Launches Example

## Example User Prompt

`Create a launch for today's regression in project 37, then check its progress.`

## Typical Tools

- `create_launch`
- `get_launch`
- `get_launch_progress`
- `close_launch`
- `reopen_launch`

## Example Calls

Create launch:

```json
{
  "name": "create_launch",
  "arguments": {
    "payload": {
      "projectId": 37,
      "name": "Regression - 2026-03-03"
    }
  }
}
```

Get launch:

```json
{
  "name": "get_launch",
  "arguments": {
    "id": 9981
  }
}
```

Get progress:

```json
{
  "name": "get_launch_progress",
  "arguments": {
    "id": 9981
  }
}
```

Attach test plan to launch:

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
