/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js'

/** @type {import("next").NextConfig} */
const config = {
  // This is the crucial part for the production Docker build!
  output: 'standalone',
  // ... any other config you have
};

export default config
