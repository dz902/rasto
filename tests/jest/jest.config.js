module.exports = {
    transform: {
        "^.+\\.(j|t)sx?$": "ts-jest"
    },
    testRegex: "(/.+\\.(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    roots: [
        "../../src",
        "../../tests/jest"
    ],
    moduleDirectories: [
        "node_modules",
        "src"
    ]
};