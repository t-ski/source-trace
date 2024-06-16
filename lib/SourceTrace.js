const { parseStack } = require("./parse-stack");


module.exports = class {
    constructor() {
        const trace = parseStack((new Error()).stack ?? "");

        this.column = trace.column;
        this.line = trace.line;
        this.path = trace.path;
        this.scope = trace.scope;
    }
}