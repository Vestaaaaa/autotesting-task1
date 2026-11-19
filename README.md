# Email Validator — Unit Tests

A practical assignment on JavaScript unit testing with Mocha and Chai.
The project validates email addresses against simplified business rules
used during user registration.

## Purpose

The function `isValidEmail(email)` checks whether a string is a valid
email address. It is used during user registration to reject obviously
invalid addresses before sending a confirmation email.

## Function

```js
isValidEmail(email) -> boolean
```

Implemented in `src/emailValidator.js`.

**Input parameters:** The function accepts a single parameter `email` (string).

**Expected result:**

- Returns `true` if the string satisfies all the rules.
- Returns `false` if the string violates at least one rule.
- Throws a `TypeError` if the argument is not a string.

## Business rules

1. **Total length** of the email — 1 to 254 characters.
2. **Spaces** are not allowed anywhere in the address.
3. **Exactly one** `@` symbol separates the local part and the domain.
4. **Local part** (before `@`):
    - length 1–64 characters;
    - allowed characters: `A-Z a-z 0-9 . _ % + -`;
    - a dot cannot appear at the beginning or the end;
    - two consecutive dots (`..`) are forbidden.
5. **Domain** (after `@`):
    - length 1–255 characters, at least one dot required;
    - each label (part between dots) is 1–63 characters long;
    - allowed characters in a label: `A-Z a-z 0-9 -`;
    - a label cannot start or end with a hyphen.
6. **TLD** (the last label) — letters only, at least 2 characters.

## Test scenarios

Tests live in `test/emailValidator.test.js` and are grouped by category.

### Smoke test

One basic test: the function returns a `boolean` and does not crash on
valid input. If the smoke test fails, there is no point in writing the
rest until the core is fixed.

### Positive tests

Verify that the function **accepts** valid addresses and returns `true`:

- simple address `user@example.com`;
- multi-level subdomain `user@example.mail.lt.com`;
- dot in the local part `username.surname@example.com`;
- `+` in the local part `user+smth@example.com` (plus-addressing);
- hyphen in the domain `user@my-domain.com`.

### Negative tests

Verify that the function **rejects** invalid addresses and returns `false`:

- no `@`;
- two `@` symbols;
- empty domain part (`user@`);
- empty local part (`@example.com`);
- no dot in the domain (`user@com`);
- leading or trailing dot in the local part;
- two consecutive dots in the local part;
- space inside the address;
- forbidden characters (e.g. `!`).

### Boundary tests (BVA)

Verify values **exactly on the boundary** of each rule and one step
beyond it — where `>=` vs `>` off-by-one bugs usually hide:

- empty string `''` → `false`;
- local part of exactly 64 characters → `true`;
- local part of 65 characters → `false`;
- TLD of exactly 2 characters → `true`;
- TLD of 1 character → `false`.

The 64-character test also includes a sanity check on the input data
(`expect(email.split('@')[0].length).to.equal(64)`) so that the test
cannot pass (or fail) because of a mistake in the fixture itself.

### Robustness tests

Verify that the function **does not crash uncontrollably** on invalid
data types but throws `TypeError` instead:

- `null`;
- `undefined`;
- number;
- array;
- object.

### Lifecycle hooks

The `with shared fixtures` block demonstrates `beforeEach` / `afterEach`:
before each test, arrays of valid and invalid email addresses are
prepared; after each test, they are cleared. Inside the tests, checks
are performed with `forEach`, which gives dynamic generation of
assertions from a dataset.

## Installation and running

Requires Node.js (version 16+).

```bash
# install dependencies
npm install

# run the test suite
npm test
```

## Project structure

```text
autotesting-task1/
├── src/
│   └── emailValidator.js         # implementation of isValidEmail
├── test/
│   └── emailValidator.test.js    # unit tests (Mocha + Chai)
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```
