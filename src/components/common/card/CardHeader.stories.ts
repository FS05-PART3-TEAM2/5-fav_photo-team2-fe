import type { Meta, StoryObj } from "@storybook/react";
import CardHeader from "./CardHeader";

// 메타 데이터, 제네릭에 스토리 컴포넌트 전달
const meta: Meta<typeof CardHeader> = {
  // 사이드바에 표시할 카테고리와 제목
  title: "Example/CardHeader",
  // 스토리 컴포넌트
  component: CardHeader,
  // 스토리 레이아웃 설정 (필수는 아님 x 스토리북에서 화면 가운데로 정렬시켜줌)
  // parameters: {
  //   layout: "centered",
  // },
};

export default meta;

// 스토리 타입 정의
type Story = StoryObj<typeof meta>;

// 스토리 내보내기
export const Default01: Story = {};
