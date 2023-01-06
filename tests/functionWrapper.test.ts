import wrap, { functionWrapper, ReturnObject } from "../src/functionWrapper";

describe("Testing functionWrapper", () => {
	test("Default export or named export both work", () => {
		expect(wrap).toBeDefined();
		expect(wrap).toBe(functionWrapper);
	});
	describe("Test Error throwing", () => {
		test("Catches Error Objects", () => {
			// Reference is necessary to place into return object
			const throwErr = () => {
				throw new Error();
			};
			expect(functionWrapper(throwErr)).toStrictEqual<
				ReturnObject<typeof throwErr>
			>({
				error: new Error(),
				args: [],
				function: throwErr,
			});
		});
		test("Catches Error String Literals", () => {
			const errToThrow = "This is an error string";
			// Reference is necessary to place into return object
			const throwErrFunction = () => {
				throw errToThrow;
			};
			// Check equality
			expect(functionWrapper(throwErrFunction)) //
				.toStrictEqual<ReturnObject<typeof throwErrFunction>>({
					error: new Error(errToThrow),
					args: [],
					function: throwErrFunction,
				});
		});
		test("Catches Error Object Literals", () => {
			const errToThrow = { value: "This is an error string" };
			// Reference is necessary to place into return object
			const throwErrFunction = () => {
				throw errToThrow;
			};
			// Check equality
			expect(functionWrapper(throwErrFunction)) //
				.toStrictEqual<ReturnObject<typeof throwErrFunction>>({
					error: new Error(String(errToThrow)),
					args: [],
					function: throwErrFunction,
				});
		});
		test("Catches Error Number Literals", () => {
			const errToThrow = 10912930;
			// Reference is necessary to place into return object
			const throwErrFunction = () => {
				throw errToThrow;
			};
			expect(functionWrapper(throwErrFunction)) //
				.toStrictEqual<ReturnObject<typeof throwErrFunction>>({
					error: new Error(String(errToThrow)),
					args: [],
					function: throwErrFunction,
				});
		});
	});
	describe("Test with successful function", () => {
		test("Returns correct value with no arguments", () => {
			const num = () => 42;
			expect(functionWrapper(num)) //
				.toMatchObject<ReturnObject<typeof num>>({
					return: 42,
					args: [],
					function: num,
				});
		});
		test("Returns correct value with 1 argument", () => {
			const strIdent = (x: string) => x;
			expect(functionWrapper(strIdent, "hello world")) //
				.toMatchObject<ReturnObject<typeof strIdent>>({
					return: "hello world",
					args: ["hello world"],
					function: strIdent,
				});
		});
		test("Returns correct value with rest argument", () => {
			/** Returns all arguments as an array */
			const restIdentity = (...x: any[]) => x;
			const inputArray = [0, 1, "2", 3, 4];
			expect(functionWrapper(restIdentity, ...inputArray)) //
				.toMatchObject<ReturnObject<typeof restIdentity>>({
					return: inputArray,
					args: inputArray,
					function: restIdentity,
				});
		});
	});
	describe("Intentional errors on misuse", () => {
		test("Throws Error if called without a callback", () => {
			expect(functionWrapper).toThrowError(/.+ is not a function/);
		});
		test("Throws Error if called with a callback that isn't callable", () => {
			//@ts-expect-error
			expect(() => functionWrapper(42)).toThrowError(/.+ is not a function/);
		});
	});
});
jest;
