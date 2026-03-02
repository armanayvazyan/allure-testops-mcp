# Test Results Example

## Example User Prompt

`Show failed test results from launch 9981 and assign one to qa.user.`

## Typical Tools

- `list_test_results`
- `search_test_results`
- `get_test_result`
- `assign_test_result`
- `resolve_test_result`

## Example Calls

List for launch:

```json
{
  "name": "list_test_results",
  "arguments": {
    "launchId": 9981,
    "page": 0,
    "size": 20
  }
}
```

Search across project:

```json
{
  "name": "search_test_results",
  "arguments": {
    "projectId": 37,
    "rql": "status == FAILED",
    "page": 0,
    "size": 20
  }
}
```

Assign:

```json
{
  "name": "assign_test_result",
  "arguments": {
    "id": 456789,
    "payload": {
      "username": "qa.user"
    }
  }
}
```

Resolve:

```json
{
  "name": "resolve_test_result",
  "arguments": {
    "id": 456789,
    "payload": {
      "status": "MUTED"
    }
  }
}
```
