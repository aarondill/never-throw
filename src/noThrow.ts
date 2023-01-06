/** (Readonly) Return values from the `functionWrapper` function */
export type BaseReturn<CallbackFunction extends (...args: any) => any> =
	Readonly<{
		function: CallbackFunction;
		args: Readonly<Parameters<CallbackFunction>>;
	}>;
export type Err<CallbackFunction extends (...args: any) => any> = Readonly<
	BaseReturn<CallbackFunction> & {
		readonly isErr: true;
		readonly error: Error;
	}
>;
export type Success<CallbackFunction extends (...args: any) => any> = Readonly<
	BaseReturn<CallbackFunction> & {
		readonly isErr: false;
		readonly return: ReturnType<CallbackFunction>;
	}
>;
export type AwaitedSuccess<CallbackFunction extends (...args: any) => any> =
	BaseReturn<CallbackFunction> & {
		readonly isErr: false;
		readonly return: Awaited<ReturnType<CallbackFunction>>;
	};

export type AwaitedErr<CallbackFunction extends (...args: any) => any> =
	Readonly<
		BaseReturn<CallbackFunction> & {
			readonly isErr: true;
			readonly error: Error;
		}
	>;
export async function noThrowAsync<
	CallbackArgs extends Array<any>,
	CallbackReturn
>(
	cb: (...args: CallbackArgs) => CallbackReturn,
	...args: CallbackArgs
): Promise<
	| AwaitedSuccess<typeof cb> /* ByProps<CallbackArgs, CallbackReturn> */
	| AwaitedErr<typeof cb> /* ByProps<CallbackArgs, CallbackReturn> */
> {
	type CB = typeof cb;
	if (typeof cb !== "function") {
		// Cause compiler error if anything other than function is ever allowed here
		const _ensureThisNeverHappens: never = cb;
		// If cb isn't callable, call it anyways to generate an error
		(cb as () => void)();
	}
	/** Properties always returned */
	const alwaysReturned: BaseReturn<CB> = { function: cb, args };
	try {
		/* If Success */
		const r: AwaitedSuccess<CB> = {
			return: await cb(...args),
			isErr: false,
			...alwaysReturned,
		};
		return r;
	} catch (e) {
		/* If Error Thrown */
		const err = e instanceof Error ? e : new Error(String(e));
		const r: AwaitedErr<CB> = {
			error: err,
			isErr: true,
			...alwaysReturned,
		};
		return r;
	}
}

/**
 * @param {function} cb Takes a callback function
 * @returns {Success<typeof cb> | Err<typeof cb>}
 * 	object with `error` or `return` value depending on whether cb threw
 *  also has `args` and `function` properties, defined by the inputs
 */
export function noThrow<CallbackArgs extends Array<any>, CallbackReturn>(
	cb: (...args: CallbackArgs) => CallbackReturn,
	...args: CallbackArgs
): Success<typeof cb> | Err<typeof cb> {
	type CB = typeof cb;
	if (typeof cb !== "function") {
		// Cause compiler error if anything other than function is ever allowed here
		const _ensureThisNeverHappens: never = cb;
		// If cb isn't callable, call it anyways to generate an error
		(cb as () => void)();
	}
	/** Properties always returned */
	const alwaysReturned: BaseReturn<CB> = { function: cb, args };
	try {
		/* If Success */
		const r: Success<CB> = {
			return: cb(...args),
			isErr: false,
			...alwaysReturned,
		};
		return r;
	} catch (e) {
		/* If Error Thrown */
		const err = e instanceof Error ? e : new Error(String(e));
		const r: Err<CB> = { error: err, isErr: true, ...alwaysReturned };
		return r;
	}
}
export default noThrow;
