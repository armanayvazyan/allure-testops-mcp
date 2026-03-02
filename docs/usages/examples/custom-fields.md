# Custom Fields Example

## Example User Prompt

`Find custom field values for "Priority" in project 37 and set a test case priority to High.`

## Typical Tools

- `list_project_custom_fields`
- `list_custom_field_values`
- `get_test_case_custom_fields`
- `set_test_case_custom_fields`

## Example Calls

List fields:

```json
{
  "name": "list_project_custom_fields",
  "arguments": {
    "projectId": 37,
    "query": "Priority",
    "page": 0,
    "size": 20
  }
}
```

List values for a field:

```json
{
  "name": "list_custom_field_values",
  "arguments": {
    "projectId": 37,
    "customFieldId": 11,
    "page": 0,
    "size": 50
  }
}
```

Set values on a test case:

```json
{
  "name": "set_test_case_custom_fields",
  "arguments": {
    "testCaseId": 12345,
    "payload": [
      {
        "customField": {
          "id": 11
        },
        "value": "High"
      }
    ]
  }
}
```
