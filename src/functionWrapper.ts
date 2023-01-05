import { assert, Equals } from "tsafe";

/** Return values from the `functionWrapper` function */
type ReturnObject<func extends (...args: any) => any> = {
	function: func;
	args: Parameters<func>;
} & (
	| {
			return: ReturnType<func>;
			error?: never;
	  }
	| {
			return?: never;
			error: Error;
	  }
);

/**
 * @param {function} cb Takes a callback function
 * @returns {ReturnObject}
 * 	object with `error` or `return` value depending on whether cb threw
 *  also has `args` and `function` properties, defined by the inputs
 */
export const functionWrapper = function <cbArgs extends Array<any>, cbReturn>(
	cb: (...args: cbArgs) => cbReturn,
	...args: cbArgs
): ReturnObject<typeof cb> {
	/** Properties always returned */
	const alwaysReturned = { function: cb, args } as const;
	try {
		/* If Success */
		return { return: cb(...args), ...alwaysReturned };
	} catch (e) {
		/* If Error Thrown */
		const err = e instanceof Error ? e : new Error(String(e));
		return { error: err, ...alwaysReturned };
	}
};

/* Type Testing */
const func = <T>(a: T) => [1, "two", a] as const;
type ReturnByFunc = ReturnType<typeof func> | undefined;
type WrapReturned = ReturnObject<typeof func>["return"];
assert<Equals<ReturnByFunc, WrapReturned>>();
