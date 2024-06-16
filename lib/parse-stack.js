const TRACE_LINE_REGEX = /([^ ]+) *[@(](.*)\:(\d+):(\d+)\)?/;


module.exports.parseStack = function(stack) {
    return stack
    .split(/\n/g)
    .filter((line) => TRACE_LINE_REGEX.test(line))
    .slice(1, 2)
    .map((line) => {
        const trace = line.match(TRACE_LINE_REGEX);
        return {
            scope: trace[1],
            path: trace[2].replace(/(\.[cm]?js)?$/, ".js"),
            line: parseInt(trace[3]),
            column: parseInt(trace[4])
        };
    })[0] ?? null;
}