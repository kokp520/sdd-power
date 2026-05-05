# Project Constitution

## 1. Naming Conventions
- Variables: `camelCase`
- Classes: `PascalCase`
- Files: `snake_case` (or as per language standard)

## 2. Architectural Principles
- Follow Layered Architecture (Controller -> Service -> Repository).
- No direct database calls from UI.

## 3. Testing Standards
- All new features must have > 80% unit test coverage.
- Use `testify/suite` for Golang tests.

## 4. Code Style
- Use `prettier` or `gofmt` before committing.
