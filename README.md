# Source Trace

Reliable source code position tracing.

``` cli
npm install t-ski/source-trace
```

### Usage

<sub>/app/example.js</sub>
``` js
const SourceTrace = require("@t-ski/source-trace");

function example() {
    const trace = new SourceTrace();
    const filename = require("path").basename(trace.path);

    console.log(`Evaluation at ${[
        `file:  ${filename}`,
        `line:  ${trace.line}`,
        `col:   ${trace.column}`,
        `scope: ${trace.scope}`
    ].join("\n)}``;
}
```

#### Output

``` cli
Evaluation at
file:  /app/example.js
line:  15
col:   19
scope: example
```

##

<sub>&copy; Thassilo Martin Schiepanski</sub>
