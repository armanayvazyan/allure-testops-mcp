# Custom Fields Example

## Example User Prompt

`Find custom field values for "Priority" in project 37 and set a test case priority to High.`

## Typical Tools

- `list_project_custom_fields`
- `list_custom_field_values`
- `get_test_case_custom_fields`
- `set_test_case_custom_fields` — adds values (does not remove existing)
- `remove_test_case_custom_fields` — removes custom field values from test cases
- `bulk_set_test_case_custom_fields` — set fields on multiple test cases with replace/add mode
- `delete_custom_field_value` — delete an orphaned value definition
- `rename_custom_field_value` — rename a value globally
- `merge_custom_field_values` — merge two values into one
- `search_test_cases_by_missing_field` — find test cases missing a field

## Example Calls

### List fields

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

### List values for a field

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

### Set values on a single test case

```json
{
  "name": "set_test_case_custom_fields",
  "arguments": {
    "projectId": 37,
    "testCaseId": 12345,
    "payload": [
      {
        "customField": { "id": 11 },
        "values": [{ "id": 101, "name": "High" }]
      }
    ]
  }
}
```

Flat payload items are also accepted and normalized automatically:

```json
{
  "name": "set_test_case_custom_fields",
  "arguments": {
    "projectId": 37,
    "testCaseId": 12345,
    "payload": [
      {
        "id": 101,
        "name": "High",
        "customField": { "id": 11 }
      }
    ]
  }
}
```

> **Note:** `set_test_case_custom_fields` ADDS values. For multi-select fields, existing values
> are preserved. To replace values, use `bulk_set_test_case_custom_fields` with `mode: "replace"`.

### Bulk set custom fields on multiple test cases (with replace)

```json
{
  "name": "bulk_set_test_case_custom_fields",
  "arguments": {
    "projectId": 37,
    "testCaseIds": [12345, 12346, 12347],
    "mode": "replace",
    "payload": [
      {
        "customField": { "id": -2 },
        "values": [{ "name": "Insights" }]
      }
    ]
  }
}
```

### Remove custom field values from test cases

```json
{
  "name": "remove_test_case_custom_fields",
  "arguments": {
    "projectId": 37,
    "testCaseIds": [12345, 12346],
    "customFieldId": -2
  }
}
```

### Rename a custom field value

```json
{
  "name": "rename_custom_field_value",
  "arguments": {
    "valueId": 1234,
    "name": "Insights"
  }
}
```

### Delete an orphaned custom field value

```json
{
  "name": "delete_custom_field_value",
  "arguments": {
    "valueId": 1234
  }
}
```

### Merge two custom field values

```json
{
  "name": "merge_custom_field_values",
  "arguments": {
    "projectId": 37,
    "customFieldId": -2,
    "sourceValueId": 1234,
    "targetValueId": 1235
  }
}
```

### Find test cases missing a custom field

```json
{
  "name": "search_test_cases_by_missing_field",
  "arguments": {
    "projectId": 37,
    "fieldName": "Feature",
    "size": 100
  }
}
```

With additional filter:

```json
{
  "name": "search_test_cases_by_missing_field",
  "arguments": {
    "projectId": 37,
    "fieldName": "Feature",
    "additionalRql": "cf[\"Suite\"] = \"API\"",
    "size": 100
  }
}
```

## RQL Query Reference

The `search_test_cases` tool uses RQL (Rich Query Language) for filtering.

| Pattern | Example | Description |
|---------|---------|-------------|
| Exact match | `cf["Feature"] = "Auth"` | Custom field equals value |
| Empty check | `cf["Feature"] is empty` | Field not set |
| Negation | `not cf["Feature"] = "Auth"` | Field is not value |
| Contains | `name ~ "login"` | Name contains substring |
| Tag filter | `tag = "smoke"` | Filter by tag |
| Combined | `cf["Suite"] = "API" and cf["Feature"] is empty` | AND combination |

> **Note:** `cf["Feature"] = null`, `cf["Feature"] = ""`, and `cf["Feature"] is null` do NOT work.
> Use `cf["Feature"] is empty` to find test cases without a field value.
