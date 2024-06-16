const SourceTrace = require("../lib/SourceTrace");


function B() {
    const sourceTrace
    = new SourceTrace();
    test(sourceTrace.path, "/Users/Privat/Desktop/salty-url/test/SourceTrace.test.js");
    test(sourceTrace.line, 6);
    test(sourceTrace.column, 7);
}

function A() {
    B();

    const sourceTrace = new SourceTrace();
    test(sourceTrace.path, "/Users/Privat/Desktop/salty-url/test/SourceTrace.test.js");
    test(sourceTrace.line, 15);
    test(sourceTrace.column, 25);
}

A();