// Next.js는 기본적으로 next.config.js 파일을 찾으므로,
// 이 파일에서 next.config.ts 파일의 설정을 가져옵니다.
// @ts-check

/* eslint-disable @typescript-eslint/no-require-imports */
require("ts-node").register({ transpileOnly: true });

/** @type {import('next').NextConfig} */
const nextConfig = require("./next.config.ts").default;
/* eslint-enable @typescript-eslint/no-require-imports */

module.exports = nextConfig;
