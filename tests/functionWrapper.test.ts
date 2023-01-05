import wrap, { functionWrapper } from "../src/functionWrapper";

describe("Testing functionWrapper", () => {
	test("Default export or named export both work", () => {
		expect(wrap).toBeDefined();
		expect(wrap).toBe(functionWrapper);
	});
	test("Catches Errors", () => {
		// const errorToThrow = new Error();
		const throwErr = () => {
			throw new Error();
		};
		expect(() => functionWrapper(throwErr)).toStrictEqual({
			error: new Error(),
		});
	});
});
