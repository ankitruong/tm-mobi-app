module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:lingui/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-native",
    "prettier",
    "import",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    "react-native/react-native": true,
    browser: true,
    es2022: true,
    node: true,
  },
  globals: {
    AbortController: "readonly",
    fetch: "readonly",
    console: "readonly",
    setTimeout: "readonly",
    clearTimeout: "readonly",
    require: "readonly",
    module: "readonly",
    __dirname: "readonly",
    process: "readonly",
  },
  rules: {
    // Rules set to "off"
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react-native/no-inline-styles": "off",
    "react-native/no-color-literals": "off",
    "react/no-unescaped-entities": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",

    // Rules set to "warn"
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "react-hooks/exhaustive-deps": "warn",
    "import/no-named-as-default": "warn",
    "import/no-named-as-default-member": "warn",

    // Rules set to "error"
    "prettier/prettier": "error",
    "react-native/no-raw-text": ["error", { skip: ["Button", "Text"] }],
    "react-native/sort-styles": ["error", "asc"],
    "prefer-const": "error",
    "react-native/no-single-element-style-arrays": "error",
    "react-native/no-unused-styles": "error",
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/namespace": "error",
    "import/default": "error",
    "import/export": "error",
    "import/no-duplicates": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
      "babel-module": {},
    },
  },
};
