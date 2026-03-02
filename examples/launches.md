# Launch Prompt Examples

Use these prompts to operate launch workflows.

## 1) List recent launches

**Prompt**
> List launches for project `Payments`, newest first, first 20 only.

**What happens**
- Uses `list_launches` with pagination/sort.

## 2) Create a launch

**Prompt**
> Create a new launch in project ID `37` named `Sprint 21 Regression`.

**What happens**
- Uses `create_launch`

```json
{
  "payload": {
    "projectId": 37,
    "name": "Sprint 21 Regression"
  }
}
```

## 3) Add test cases to a launch

**Prompt**
> Add test cases `12345`, `12346`, and `12347` to launch `9001`.

**What happens**
- Uses `add_test_cases_to_launch`
- Payload format is server-defined; assistant sends an object with test case references.

## 4) Add a test plan to a launch

**Prompt**
> Add test plan `555` to launch `9001`.

**What happens**
- Uses `add_test_plan_to_launch`

## 5) Inspect launch quality

**Prompt**
> For launch `9001`, show statistics and progress.

**What happens**
- Uses `get_launch_statistic`
- Uses `get_launch_progress`

## 6) Close and reopen launch

**Prompt**
> Close launch `9001`. If I say rollback, reopen it.

**What happens**
- Uses `close_launch`
- Uses `reopen_launch` when requested

## 7) Search launches by AQL

**Prompt**
> Search launches in project `Payments` where name contains `Regression` and return page 0 size 10.

**What happens**
- Uses `search_launches` with `rql`.

## Extra useful prompts

- "Get launch `9001` details." -> `get_launch`
- "Rename launch `9001` to `Sprint 21 Regression - Final`." -> `update_launch`
- "Delete launch `9001`." -> `delete_launch`
