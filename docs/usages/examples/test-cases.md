# Test Cases Example

## Example User Prompt

`List the latest 10 test cases in project 37 that contain "checkout" in the name.`

## Typical Tools

- `list_test_cases`
- `search_test_cases`
- `get_test_case`
- `create_test_case`
- `update_test_case`
- `delete_test_case`
- `restore_test_case`

## Example Calls

List by search text:

```json
{
  "name": "list_test_cases",
  "arguments": {
    "projectId": 37,
    "search": "checkout",
    "page": 0,
    "size": 10
  }
}
```

Search by AQL:

```json
{
  "name": "search_test_cases",
  "arguments": {
    "projectId": 37,
    "rql": "name ~ \"checkout\"",
    "page": 0,
    "size": 10
  }
}
```

Create:

```json
{
  "name": "create_test_case",
  "arguments": {
    "payload": {
      "projectId": 37,
      "name": "Checkout - card payment success"
    }
  }
}
```

Update:

```json
{
  "name": "update_test_case",
  "arguments": {
    "id": 12345,
    "payload": {
      "name": "Checkout - card payment success (happy path)"
    }
  }
}
```
