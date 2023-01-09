import type {
	AwaitedSuccess,
	BaseReturn,
	Err,
	Success,
} from "../src/neverThrow";
import wrap, { neverThrow, neverThrowAsync } from "../src/neverThrow";

/* Type Testing */

import type { Equals } from "tsafe";
describe("Testing neverThrow types", () => {
	// All of this will be removed on successful compilation
	// Won't compile if error
	type Assert<_T extends true> = never;
	type TestFunc = <T>(a: T) => [1, "two", T];
	type _ReturnFieldIsWrong = Assert<
		Equals<ReturnType<TestFunc>, Success<TestFunc>["return"]>
	>;
	type _FunctionFieldIsWrong = Assert<
		Equals<BaseReturn<TestFunc>["function"], TestFunc>
	>;
});

/* Functionality Testing */

describe("Testing neverThrow", () => {
	test("Default export is same object as named export", () => {
		expect(wrap).toBe(neverThrow);
	});
	describe("Test Error throwing", () => {
		test("Catches Error Objects", () => {
			// Reference is necessary to place into return object
			const throwErr = () => {
				throw new Error();
			};
			expect(neverThrow(throwErr)).toStrictEqual<Err<typeof throwErr>>({
				isErr: true,
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
			expect(neverThrow(throwErrFunction)) //
				.toStrictEqual<Err<typeof throwErrFunction>>({
					isErr: true,
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
			expect(neverThrow(throwErrFunction)) //
				.toStrictEqual<Err<typeof throwErrFunction>>({
					isErr: true,
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
			expect(neverThrow(throwErrFunction)) //
				.toStrictEqual<Err<typeof throwErrFunction>>({
					isErr: true,
					error: new Error(String(errToThrow)),
					args: [],
					function: throwErrFunction,
				});
		});
	});
	describe("Test with successful function", () => {
		test("Returns correct value with no arguments", () => {
			const num = () => 42;
			expect(neverThrow(num)) //
				.toStrictEqual<Success<typeof num>>({
					isErr: false,
					return: 42,
					args: [],
					function: num,
				});
		});
		test("Returns correct value with 1 argument", () => {
			const strIdent = (x: string) => x;
			expect(neverThrow(strIdent, "hello world")) //
				.toStrictEqual<Success<typeof strIdent>>({
					isErr: false,
					return: "hello world",
					args: ["hello world"],
					function: strIdent,
				});
		});
		test("Returns correct value with rest argument", () => {
			/** Returns all arguments as an array */
			const restIdentity = (...x: any[]) => x;
			const inputArray = [0, 1, "2", 3, 4];
			expect(neverThrow(restIdentity, ...inputArray)) //
				.toStrictEqual<Success<typeof restIdentity>>({
					isErr: false,
					return: inputArray,
					args: inputArray,
					function: restIdentity,
				});
		});
	});
	describe("Intentional errors on misuse", () => {
		test("Throws Error if called without a callback", () => {
			expect(neverThrow).toThrowError(/.+ is not a function/);
		});
		test("Throws Error if called with a callback that isn't callable", () => {
			//@ts-expect-error
			expect(() => neverThrow(42)).toThrowError(/.+ is not a function/);
		});
	});
});
describe("Testing neverThrowAsync", () => {
	describe("Test Error throwing", () => {
		test("Catches Error Objects", () => {
			// Reference is necessary to place into return object
			const throwErr = async () => {
				throw new Error();
			};
			return expect(neverThrowAsync(throwErr)).resolves.toStrictEqual<
				Err<typeof throwErr>
			>({
				isErr: true,
				error: new Error(),
				args: [],
				function: throwErr,
			});
		});
		test("Catches Error String Literals", () => {
			const errToThrow = "This is an error string";
			// Reference is necessary to place into return object
			const throwErrFunction = async () => {
				throw errToThrow;
			};
			// Check equality
			return expect(neverThrowAsync(throwErrFunction))
				.resolves //
				.toStrictEqual<Err<typeof throwErrFunction>>({
					isErr: true,
					error: new Error(errToThrow),
					args: [],
					function: throwErrFunction,
				});
		});
		test("Catches Error Object Literals", () => {
			const errToThrow = { value: "This is an error string" };
			// Reference is necessary to place into return object
			const throwErrFunction = async () => {
				throw errToThrow;
			};
			// Check equality
			return expect(neverThrowAsync(throwErrFunction))
				.resolves //
				.toStrictEqual<Err<typeof throwErrFunction>>({
					isErr: true,
					error: new Error(String(errToThrow)),
					args: [],
					function: throwErrFunction,
				});
		});
		test("Catches Error Number Literals", () => {
			const errToThrow = 10912930;
			// Reference is necessary to place into return object
			const throwErrFunction = async () => {
				throw errToThrow;
			};
			return expect(neverThrowAsync(throwErrFunction))
				.resolves //
				.toStrictEqual<Err<typeof throwErrFunction>>({
					isErr: true,
					error: new Error(String(errToThrow)),
					args: [],
					function: throwErrFunction,
				});
		});
	});
	describe("Test with successful async function", () => {
		test("Returns correct value with no arguments", () => {
			const num = async () => 42;
			return expect(neverThrowAsync(num))
				.resolves //
				.toStrictEqual<AwaitedSuccess<typeof num>>({
					isErr: false,
					return: 42,
					args: [],
					function: num,
				});
		});
		test("Returns correct value with 1 argument", () => {
			const strIdent = async (x: string) => x;
			return expect(neverThrowAsync(strIdent, "hello world"))
				.resolves //
				.toStrictEqual<AwaitedSuccess<typeof strIdent>>({
					isErr: false,
					return: "hello world",
					args: ["hello world"],
					function: strIdent,
				});
		});
		test("Returns correct value with rest argument", () => {
			/** Returns all arguments as an array */
			const restIdentity = async (...x: readonly any[]) => x;
			const inputArray = [0, 1, "2", 3, 4] as const;
			return expect(neverThrowAsync(restIdentity, ...inputArray))
				.resolves //
				.toStrictEqual<AwaitedSuccess<typeof restIdentity>>({
					isErr: false,
					return: inputArray,
					args: inputArray,
					function: restIdentity,
				});
		});
	});
	describe("Test with successful synchronous function", () => {
		test("Returns correct value with no arguments", () => {
			const num = () => 42;
			return expect(neverThrowAsync(num))
				.resolves //
				.toStrictEqual<AwaitedSuccess<typeof num>>({
					isErr: false,
					return: 42,
					args: [],
					function: num,
				});
		});
		test("Returns correct value with 1 argument", () => {
			const strIdent = (x: string) => x;
			return expect(neverThrowAsync(strIdent, "hello world"))
				.resolves //
				.toStrictEqual<AwaitedSuccess<typeof strIdent>>({
					isErr: false,
					return: "hello world",
					args: ["hello world"],
					function: strIdent,
				});
		});
		test("Returns correct value with rest argument", () => {
			/** Returns all arguments as an array */
			const restIdentity = (...x: readonly any[]) => x;
			const inputArray = [0, 1, "2", 3, 4] as const;
			return expect(neverThrowAsync(restIdentity, ...inputArray))
				.resolves //
				.toStrictEqual<AwaitedSuccess<typeof restIdentity>>({
					isErr: false,
					return: inputArray,
					args: inputArray,
					function: restIdentity,
				});
		});
	});
	describe("Intentional errors on misuse", () => {
		test("Throws Error if called without a callback", () => {
			return expect(neverThrowAsync).rejects.toThrowError(
				/.+ is not a function/
			);
		});
		test("Throws Error if called with a callback that isn't callable", () => {
			//@ts-expect-error
			return expect(() => neverThrowAsync(42)).rejects.toThrowError(
				/.+ is not a function/
			);
		});
	});
});
