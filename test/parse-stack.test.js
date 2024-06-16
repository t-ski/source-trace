const { parseStack } = require("../lib/parse-stack");


const EXPECTED_TRACE = {
    scope: "bar",
    path: "/Users/Privat/Desktop/foo.js",
    line: 5,
    column: 8
};


// JavaScriptCore
test(parseStack(`
    baz@/Users/Privat/Desktop/bar/baz.js:9:15
    bar@/Users/Privat/Desktop/foo.js:5:8
    foo@/Users/Privat/Desktop/foo.js:3:10
    global code@/Users/Privat/Desktop/foo.js:11:2
`.trim()), EXPECTED_TRACE);

// SpiderMonkey
test(parseStack(`
baz@/Users/Privat/Desktop/bar/baz.js:9:15
bar@/Users/Privat/Desktop/foo.js:5:8
foo@/Users/Privat/Desktop/foo.js:3:10
@/Users/Privat/Desktop/foo.js:11:2
`.trim()), EXPECTED_TRACE);

// V8
test(parseStack(`
Error
  at baz (/Users/Privat/Desktop/foo/baz:9:15)
  at bar (/Users/Privat/Desktop/foo:5:8)
  at foo (/Users/Privat/Desktop/foo:3:10)
  at /Users/Privat/Desktop/foo.js:11:2
`.trim()), EXPECTED_TRACE);

// Bun
test(parseStack(`
Error
    at baz (/Users/Privat/Desktop/foo/baz:9:15)
    at bar (/Users/Privat/Desktop/foo:5:8)
    at foo (/Users/Privat/Desktop/foo:3:10)
    at module code (/Users/Privat/Desktop/foo.ts:11:2)
    at moduleEvaluation (:1:11)
    at <anonymous> (:2:1)
`.trim()), EXPECTED_TRACE);


test(parseStack(`
Error
    at Object.<anonymous> (/Users/Privat/Desktop/foo/baz.js:3:13)
    at Module._compile (node:internal/modules/cjs/loader:1368:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1426:10)
    at Module.load (node:internal/modules/cjs/loader:1205:32)
    at Module._load (node:internal/modules/cjs/loader:1021:12)
    at Module.require (node:internal/modules/cjs/loader:1230:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (/Users/Privat/Desktop/foo/bar:1:1)
    at Module._compile (node:internal/modules/cjs/loader:1368:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1426:10)
`.trim()), {
    scope: "Module._compile",
    path: "node:internal/modules/cjs/loader.js",
    line: 1368,
    column: 14
});


test(parseStack(`
    foo
    bar
    baz
`.trim()), null);