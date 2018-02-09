module.exports = {
    transform: {
        "^.+\\.(j|t)sx?$": "ts-jest"
    },
    testRegex: "(/tests/jest/.+\\.(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    roots: [
        "./src",
        "./tests/jest"
    ],
    modulePaths: [
        "<rootDir>/src"
    ],
    globalSetup: "./tests/jest/setup.js",
    globalTeardown: "./tests/jest/teardown.js",
    testEnvironment: "./tests/jest/puppeteer_environment.js"
};