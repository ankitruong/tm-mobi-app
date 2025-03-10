module.exports = {
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix --report-unused-disable-directives --max-warnings 5",
    "prettier --write",
  ],
  "src/**/*.{json,md}": ["prettier --write"],
};
