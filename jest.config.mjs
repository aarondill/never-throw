/** @type {import('jest').Config} */
export default {
	transform: { "^.+\\.ts?$": "ts-jest" },
	testEnvironment: "node",
	// Runs ts or js files in tests directory matching:
	// .test.ts; it.test.ts; test.ts; .it.test.js; not ITtest.js
	testRegex: "/tests/(.+/)?(.*\\.)?(test|spec)\\.[tj]s(x)?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	verbose: false,
};
