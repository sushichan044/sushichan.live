/**
 * Declares a variable using the `let` keyword and initializes it with the result of the provided function.
 *
 * @template T The type of the variable.
 * @param value A function that returns the initial value of the variable.
 * @returns The initialized variable.
 */
const declareLet: <T>(value: () => T) => T = (value) => value();

export { declareLet };
