# Test Plan Prompt Examples

Use these prompts for test plan management.

## 1) List test plans

**Prompt**
> List test plans for project `Payments`, first 20.

**What happens**
- Uses `list_test_plans`.

## 2) Create a test plan

**Prompt**
> Create a test plan in project ID `37` named `Checkout Smoke`.

**What happens**
- Uses `create_test_plan`.

```json
{
  "payload": {
    "projectId": 37,
    "name": "Checkout Smoke"
  }
}
```

## 3) Update a test plan

**Prompt**
> Update test plan `555` and rename it to `Checkout Smoke - Daily`.

**What happens**
- Uses `update_test_plan`.

## 4) Run a test plan

**Prompt**
> Run test plan `555` now.

**What happens**
- Uses `run_test_plan` with required `id`
- Optional `payload` can include run options when your API expects them

## 5) Delete a test plan

**Prompt**
> Delete test plan `555`.

**What happens**
- Uses `delete_test_plan`.

## Extra useful prompt

- "Get details of test plan `555`." -> `get_test_plan`
