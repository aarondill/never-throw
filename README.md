# noThrow.ts

Simplify Error handling!

## Usage:

import the named functions
(The noThrow function can also be imported through the default import):

```javascript
import { noThrow, noThrowAsync } from "../src/noThrow";
```

Call `foo` with error handling

```js
const result = noThrow(foo);

// Pass arguments to foo:
const result = noThrow(foo, 1, 2, 3);

// Using an async function:
const result = await noThrowAsync(bar, 1, 2, 3);
//                   ^ Returns a promise
```

Returns an object with 'return' or 'error' depending on if the function threw.
Example output:

```js
console.log(noThrow(x=>x, "Hello, world!"));
{
    isErr: false,
    return: "Hello, world!",
    args: ["Hello, world!"],
    function: x=>x,
}
```

If an error is thrown:

```js
// Throws a string!!
console.log(noThrow(function(x){throw x}, "Hello, world!"));
{
    isErr: true,
    err: Error("Hello, world!"),
    args: ["Hello, world!"],
    function: function(x){throw x},
}
```

## Notes:

- If no value is returned, 'return' will be `undefined`
- `function` is the same function as was passed in
- Any non-error value thrown will be converted to an error by `Error(String(thrownError))`
- No mutation will be done on any value passed in.

## Typescript

### Exported Types:

- BaseReturn - The return value, without 'err' or 'success' properties
- Err - The object return when an error is thrown
- Success - The object returned when no error is thrown
- AwaitedSuccess - Success returned from `noThrowAsync`, equivalent to Success
- AwaitedErr - Error returned from `noThrowAsync`, equivalent to Err

### note:

```typescript
if (result.isErr === true) result is Success
else result is Err
```
