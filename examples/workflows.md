# End-to-End Workflow Prompts

These are multi-step prompts that combine several MCP tools.

## 1) Full QA cycle (test case -> launch -> result -> resolve)

**Prompt**
> In project `Payments`, create test case `Checkout with saved card`, create launch `Saved Card Regression`, add the new test case to that launch, create a failed result with comment `Timeout after submit`, then resolve it as `PASSED` after rerun.

**Typical tool sequence**
1. `create_test_case`
2. `create_launch`
3. `add_test_cases_to_launch`
4. `create_test_result`
5. `resolve_test_result`

## 2) Bulk discovery and tagging workflow

**Prompt**
> Find test cases in project `Payments` that match `checkout` and tag all of them with `regression` and `critical-path`.

**Typical tool sequence**
1. `search_test_cases` (get target IDs)
2. `set_test_case_tags` (for each selected test case)

## 3) Test plan execution workflow

**Prompt**
> Create test plan `Checkout Daily`, run it immediately, identify the launch created by the run, and report launch progress and statistics.

**Typical tool sequence**
1. `create_test_plan`
2. `run_test_plan`
3. `list_launches` or `search_launches` (find run launch)
4. `get_launch_progress`
5. `get_launch_statistic`

## Tips for workflow prompts

- Ask for explicit IDs in the response after each creation step.
- Include fallback rules: "if field IDs are unknown, discover them first."
- For project scope, prefer `projectName` in prompts and let the assistant resolve IDs.
