import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
});

const eslintConfig = [
  {
    ignores: [".next/**", ".open-next/**", ".wrangler/**", "node_modules/**", "root/canva-worker/node_modules/**"]
  },
  ...compat.extends("next/core-web-vitals")
];

export default eslintConfig;
