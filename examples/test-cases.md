# Test Case Prompt Examples

Use these prompts with your AI assistant to drive `test_case` tools in this MCP server.

## 1) Create a basic test case

**Prompt**
> Create a test case in project `Payments` called `Verify successful card payment`.

**What happens**
- Uses `create_test_case`
- Typical payload:

```json
{
  "payload": {
    "projectName": "Payments",
    "name": "Verify successful card payment"
  }
}
```

## 2) Create a detailed test case (description, scenario, tags)

**Prompt**
> Create a test case in project ID `37` named `User can reset password`, add a short description, add scenario steps, and tag it as `regression` and `auth`.

**What happens**
- Uses `create_test_case`
- May also use `set_test_case_tags` if tags are set in a separate call

## 3) Create a test case with custom fields (xyz example)

**Prompt**
> Create a test case in project `Payments` called `3DS challenge flow`, set custom field `Priority` to `High` and custom field `Component` to `Checkout`. If you need IDs, discover them first.

**What happens**
- Uses `list_project_custom_fields` to find custom field IDs
- Uses `list_custom_field_values` to find value IDs
- Uses `create_test_case` with `payload.customFields`

**Example `customFields` shape**
```json
{
  "payload": {
    "projectName": "Payments",
    "name": "3DS challenge flow",
    "customFields": [
      { "customField": { "id": 101 }, "id": 2001, "name": "High" },
      { "customField": { "id": 102 }, "id": 2020, "name": "Checkout" }
    ]
  }
}
```

## 4) Update an existing test case

**Prompt**
> Update test case `12345`: rename it to `User can reset password via email`, and refresh the description to match the current UX.

**What happens**
- Uses `update_test_case`

```json
{
  "id": 12345,
  "payload": {
    "name": "User can reset password via email",
    "description": "Updated flow with email OTP and confirmation screen."
  }
}
```

## 5) Search test cases with AQL

**Prompt**
> Search test cases in project `Payments` where name contains `checkout` and return first 20 sorted by last update.

**What happens**
- Uses `search_test_cases` with `rql`, `size`, and `sort`

## 6) Get history and scenario for troubleshooting

**Prompt**
> For test case `12345`, show scenario and recent execution history.

**What happens**
- Uses `get_test_case_scenario`
- Uses `get_test_case_history`

## 7) Delete and restore a test case

**Prompt**
> Delete test case `12345`, then restore it if deletion succeeds.

**What happens**
- Uses `delete_test_case`
- Uses `restore_test_case`

## Extra useful prompts

- "List test cases in project `Payments` with pagination (page 0, size 50)." -> `list_test_cases`
- "Get overview for test case `12345`." -> `get_test_case_overview`
- "Read tags/issues for test case `12345`." -> `get_test_case_tags`, `get_test_case_issues`
