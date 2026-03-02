# Custom Field Prompt Examples

This guide focuses on custom field discovery and assignment for test cases.

## 1) Discover custom fields in a project

**Prompt**
> Show all custom fields configured for project `Payments`.

**What happens**
- Uses `list_project_custom_fields`.

## 2) Find allowed values for a field

**Prompt**
> For custom field `101`, list available values in project `Payments`.

**What happens**
- Uses `list_custom_field_values` with `customFieldId`.

## 3) Read current custom fields on a test case

**Prompt**
> Show custom field values for test case `12345` in project `Payments`.

**What happens**
- Uses `get_test_case_custom_fields`.

## 4) Create a test case with xyz custom fields

**Prompt**
> Create test case `Promo code with expired coupon` in `Payments` and set `Priority=High`, `Platform=Web`, `Team=Checkout`. Discover field and value IDs first if needed.

**What happens**
- Uses `list_project_custom_fields`
- Uses `list_custom_field_values`
- Uses `create_test_case` with `payload.customFields`

**Example shape**
```json
{
  "payload": {
    "projectName": "Payments",
    "name": "Promo code with expired coupon",
    "customFields": [
      { "customField": { "id": 101 }, "id": 2001, "name": "High" },
      { "customField": { "id": 102 }, "id": 3002, "name": "Web" },
      { "customField": { "id": 103 }, "id": 4100, "name": "Checkout" }
    ]
  }
}
```

## 5) Update custom fields on an existing test case

**Prompt**
> For test case `12345`, set `Priority=Critical` and `Component=Checkout`.

**What happens**
- Uses `set_test_case_custom_fields`
- Payload must be an array of custom-field-value objects.

```json
{
  "testCaseId": 12345,
  "payload": [
    { "customField": { "id": 101 }, "id": 2002, "name": "Critical" },
    { "customField": { "id": 104 }, "id": 2020, "name": "Checkout" }
  ]
}
```
