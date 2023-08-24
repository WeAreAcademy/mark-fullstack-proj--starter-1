module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/ban-types": [
            "error",
            {
                types: {
                    "{}": false,
                    // to avoid having to get into Record<string, never>
                },
            },
        ],
        // "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-empty-interface": 0,
    },
};
