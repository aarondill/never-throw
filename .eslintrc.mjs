/** @type {import("@typescript-eslint/utils/dist/ts-eslint/Linter.d").Linter.Config} */
export default {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		impliedStrict: true,
	},
	env: {
		browser: true,
		node: true,
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"@typescript-eslint/naming-convention": [
			{
				selector: "default",
				modifiers: ["unused"],
				leadingUnderscore: "allow",
			},
			{
				selector: ["default", "variable"],
				leadingUnderscore: "allow",
				trailingUnderscore: "allow",
			},
			{
				selector: "default",
				format: ["camelCase"],
			},
			{
				selector: "variable",
				format: ["camelCase", "UPPER_CASE"],
			},
			{
				selector: "typeLike",
				format: ["PascalCase"],
			},
		],
		"@typescript-eslint/semi": "warn",
		eqeqeq: "warn",
		"no-throw-literal": "warn",
		semi: "off",
	},
	ignorePatterns: ["out", "dist", "**/*.d.ts", "node_modules"],
};
