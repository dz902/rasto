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
    modulePaths: [
        "<rootDir>/src"
    ],
    globalSetup: "./setup.js",
    globalTeardown: "./teardown.js",
    testEnvironment: ".//puppeteer_environment.js"
};