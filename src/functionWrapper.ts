/** (Readonly) Return values from the `functionWrapper` function */
export type ReturnObject<CallbackFunction extends (...args: any) => any> =
	Readonly<
		{
			function: CallbackFunction;
			args: Readonly<Parameters<CallbackFunction>>;
		} & (
			| {
					return: ReturnType<CallbackFunction>;
					error?: never;
			  }
			| {
					return?: never;
					error: Error;
			  }
		)
	>;

/**
 * @param {function} cb Takes a callback function
 * @returns {ReturnObject}
 * 	object with `error` or `return` value depending on whether cb threw
 *  also has `args` and `function` properties, defined by the inputs
 */
export const functionWrapper = function <
	CallbackArgs extends Array<any>,
	CallbackReturn
>(
	cb: (...args: CallbackArgs) => CallbackReturn,
	...args: CallbackArgs
): ReturnObject<typeof cb> {
	if (typeof cb !== "function") {
		// Cause compiler error if anything other than function is ever allowed here
		const _ensureThisNeverHappens: never = cb;
		// If cb isn't callable, call it anyways to generate an error
		(cb as () => void)();
	}
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
export default functionWrapper;
