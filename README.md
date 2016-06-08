ForumOne's tslint Rules
=======================

A set of admittedly miscellaneous rules for [tslint](https://palantir.github.io/tslint/).

Installation
------------

1. `npm install git:forumone/f1-tslint-misc`.
2. Register the resulting `node_modules/f1-tslint-misc/lib/rules` directory with tslint.
3. Add the rules to `tslint.json` (see below).

Rules
-----

### `promise-chain-should-complete`

This rule mandates that any chain of Thenables end with a call to `.done()`. While the `.done()` method isn't part of the ES2015 spec, many libraries include this method to ensure that unhandled rejections are not lost.

This rule uses a fairly simple heuristic to report issues. When it sees a chain of calls that mentions a method named `then`, it fires. It requires that either:

1. The promise chain is consumed. This includes assignment to a variable or passing it to a function:

  ```typescript
  let valid = getPromise().then(...);

  alsoValid(getPromise().then(...));
  ```

2. The promise chain calls `.done()` or one of its variants.

  ```typescript
  getPromise()
    .then(...)
    .done();
  ```

This rule does not do control-flow analysis, but it is assumed that the above heuristic will catch most day-to-day issues with unhandled promise rejections.

#### Configuration

```json
{
  "rules": {
    "promise-chain-should-complete": true
  }
}
```

### `no-nested-ternary`

Don't nest ternaries. This rule does not ban them outright, but it does mandate some level of decency.

#### Configuration

```json
{
  "rules": {
    "no-nested-ternary": true
  }
}
```

### `no-non-ascii`

This rule mandates that no string literal should contain a character outside
the range of Latin-1 (i.e., has a code point greater than U+00FF).

Rationale: This rule prevents typographical problems handling punctuation characters
such as the en and em dashes. In a monospace font, it's much easier to tell the
difference between `\u2013` and `\u2014` than it is to tell the difference between
– and —.

#### Configuration

```json
{
  "rules": {
    "no-non-ascii": true
  }
}
```