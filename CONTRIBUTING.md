# Contributing

Thanks for contributing to `allure-testops-mcp`.

## Development Setup

```bash
npm install
npm run build
```

Run in dev mode:

```bash
npm run dev
```

Run smoke test:

```bash
ALLURE_TESTOPS_URL="https://allure-testops.instance.com/" \
ALLURE_TOKEN="your-api-token" \
ALLURE_PROJECT_ID="37" \
npm run test:integration
```

## Pull Request Guidelines

- Keep changes focused and small.
- Include clear PR description: what changed and why.
- Update docs if behavior, API, or setup changed.
- Ensure `npm run build` passes.
- Ensure `npm run lint` passes.
- If touching API behavior, run `npm run test:integration` where possible.
- CI must be green before merge.

## Local Validation Checklist

Run before opening a PR:

```bash
npm run build
npm run lint
```

Optional API smoke verification:

```bash
npm run test:integration
```

## Branch Protection (Maintainers)

To enforce review and quality gates on the default branch:

- Require a pull request before merge
- Require at least one approval
- Require review from Code Owners
- Require status checks to pass (`CI / checks`)

Code owner is configured in [`.github/CODEOWNERS`](.github/CODEOWNERS) and points to `@armanayvazyan`.

## Commit Guidelines

- Use descriptive commit messages.
- Prefer one logical change per commit.

## Reporting Issues

- Use the issue templates.
- Include reproduction steps, expected result, and actual result.

## Scope

This project intentionally focuses on Allure TestOps workflows for:

- test cases
- launches
- test results
- test plans

Please discuss major scope expansions in an issue before implementation.
