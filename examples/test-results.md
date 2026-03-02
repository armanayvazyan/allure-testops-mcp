# Test Result Prompt Examples

Use these prompts to work with execution results.

## 1) List results for a launch

**Prompt**
> List test results for launch `9001`, page 0 size 50.

**What happens**
- Uses `list_test_results` with `launchId`.

## 2) Create a manual test result

**Prompt**
> Create a manual test result for test case `12345` under launch `9001` with status `FAILED` and include failure comment.

**What happens**
- Uses `create_test_result`
- Payload shape is flexible and passed through as-is.

## 3) Update an existing result

**Prompt**
> Update test result `777001` comment to include stack trace summary.

**What happens**
- Uses `update_test_result`

## 4) Assign a result to an owner

**Prompt**
> Assign test result `777001` to user `qa.lead`.

**What happens**
- Uses `assign_test_result`
- Payload must include `username`.

```json
{
  "id": 777001,
  "payload": {
    "username": "qa.lead"
  }
}
```

## 5) Resolve a result

**Prompt**
> Resolve test result `777001` as `PASSED`.

**What happens**
- Uses `resolve_test_result`
- Payload must include `status`.

```json
{
  "id": 777001,
  "payload": {
    "status": "PASSED"
  }
}
```

## 6) Search and inspect history

**Prompt**
> Search test results in project `Payments` for flaky checkout tests, then show history for result `777001`.

**What happens**
- Uses `search_test_results` with `rql`
- Uses `get_test_result_history`

## Extra useful prompts

- "Get test result `777001`." -> `get_test_result`
- "Search failed results in the last launch for project ID `37`." -> `search_test_results`
