module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  rules: {
    // Disable all rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // Add any other rules you want to disable
  },
};