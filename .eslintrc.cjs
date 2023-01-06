/** @type {import("@typescript-eslint/utils/dist/ts-eslint/Linter.d").Linter.Config} */
module.exports = {
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
			"warn",
			{
				// Allow any format for quoted properties
				selector: "property",
				modifiers: ["requiresQuotes"],
				format: null,
				leadingUnderscore: "allow",
				trailingUnderscore: "allow",
			},
			{
				// Allow camelCase or upper_case for non-quoted properties
				selector: "property",
				leadingUnderscore: "allow",
				trailingUnderscore: "allow",
				format: ["camelCase", "UPPER_CASE"],
			},
			{
				// Force PascalCase for types and typeLikes
				selector: "typeLike",
				format: ["PascalCase"],
			},
			{
				// Allow leading Underscores for *unused* types and typeLikes
				selector: "typeLike",
				format: ["PascalCase"],
				modifiers: ["unused"],
				leadingUnderscore: "allow",
			},
			{
				// Allow variables to be camelCase or CONSTANT and _underscores_
				selector: "variable",
				format: ["camelCase", "UPPER_CASE"],
				leadingUnderscore: "allow",
				trailingUnderscore: "allow",
			},
			{
				// Allow underscores on either side of camelCased defaults
				selector: "default",
				format: ["camelCase"],
				leadingUnderscore: "allow",
				trailingUnderscore: "allow",
			},
		],
		// See documentation at https://typescript-eslint.io/rules/
		"@typescript-eslint/semi": "warn",
		"@typescript-eslint/ban-types": "warn",
		"@typescript-eslint/no-confusing-non-null-assertion": "warn",
		"@typescript-eslint/no-extra-non-null-assertion": "error",
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unnecessary-type-constraint": "warn",
		"@typescript-eslint/no-useless-empty-export": "warn",
		"@typescript-eslint/prefer-ts-expect-error": "warn",
		"@typescript-eslint/unified-signatures": "warn",
		"no-throw-literal": "warn",
		eqeqeq: "warn",
		semi: "off",
	},
	ignorePatterns: ["out", "dist", "**/*.d.ts", "node_modules"],
};
