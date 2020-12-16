"use strict";

const ecmaVersion = 2019;

const AllowedOneCharacterVariables = [
  "a", "b", "i", "j", "k", "x", "y", "z",
];

const ReactMagicNumbers = [
  // eslint-disable-next-line no-magic-numbers -- grid options
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];

module.exports = {
  extends: [
    "@eslint-calibrate",
    "plugin:@eslint-calibrate/calibrate",
  ],
  ignorePatterns: [
    "next-env.d.ts",
  ],
  overrides: [
    // Language — MDX
    {
      extends: [
        "plugin:mdx/recommended",
      ],
      files: [
        "*.md",
        "*.mdx",
      ],
      rules: {
        "import/unambiguous": "off",
      },
    },

    // Language — TypeScript
    {
      extends: [
        "@eslint-calibrate/typescript",
        "plugin:@eslint-calibrate/typescript",
      ],
      files: [
        "*.ts",
        "*.tsx",
      ],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    // Environment — Next/React
    {
      extends: [
        "@eslint-calibrate/react",
      ],
      files: [
        "src/**/*.ts",
        "src/**/*.tsx",
      ],
      rules: {
        "@typescript-eslint/no-magic-numbers": ["error", {
          ignore: ReactMagicNumbers,
        }],
        "import/no-internal-modules": ["error", {
          allow: [
            "next/app",
            "next/head",
            "next/link",
            "next/router",
            "**/src/**",
          ],
        }],
        "import/no-named-export": "off",
        "import/prefer-default-export": "off",
        "react-hooks/exhaustive-deps": ["warn", {
          additionalHooks: "useRecoilCallback",
        }],
        // Not needed since React 17
        "react/react-in-jsx-scope": "off",
      },
      settings: {
        "import/extensions": [".ts", ".tsx"],
        "react": {
          version: "detect",
        },
      },
    },
    {
      // Next Page exports
      files: ["src/pages/**/*.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },

    // Environment — Jest
    {
      extends: [
        "@eslint-calibrate/jest",
      ],
      files: [
        "*.test.js",
        "*.test.ts",
        "*.test.tsx",
      ],
      rules: {
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-magic-numbers": "off",
      },
    },

    // Environment — Node / CommonJS
    {
      extends: [
        "@eslint-calibrate/node",
        "@eslint-calibrate/node/script",
      ],
      files: [
        "scripts/**/*.js",
        ".eslintrc.js",
      ],
    },

    // Environment — Node / TypeScript
    {
      extends: [
        "@eslint-calibrate/node",
        "@eslint-calibrate/node/typescript",
      ],
      files: [
        "scripts/**/*.ts",
      ],
      rules: {
        "import/no-internal-modules": [
          "error", {
            "allow": ["src/**"],
          },
        ],
      },
    },
  ],

  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
    },
    ecmaVersion,
    sourceType: "module",
  },
  root: true,
  rules: {
    "id-length": ["error", {
      exceptions: AllowedOneCharacterVariables,
    }],
    "import/no-relative-parent-imports": "off",
    "no-warning-comments": "warn",
  },
};
