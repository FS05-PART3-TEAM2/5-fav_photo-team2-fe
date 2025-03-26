import { beforeAll, afterAll, afterEach } from "vitest";

// 기본 Vitest 설정
beforeAll(() => {
  // 테스트 시작 전 설정
  console.log("Vitest 테스트 시작");
});

afterEach(() => {
  // 각 테스트 후 정리
});

afterAll(() => {
  // 모든 테스트 완료 후 정리
  console.log("Vitest 테스트 완료");
});
