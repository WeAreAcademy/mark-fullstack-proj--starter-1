/** Returns the value of the environment variable with the given key
 * or else throws an error.
 *
 * @param key the name of environment variable to find
 * @returns the value of the environment variable (or throws error)
 */
export function getEnvVarOrFail(key: string): string {
    const val = process.env[key];
    if (val === undefined) {
        throw new Error("Missing expected environment variable: " + key);
    }
    return val;
}
