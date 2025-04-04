import { Genre, Grade } from "./photocard.types";

// 필터 관련 타입 정의
export type GradeFilter = "default" | Grade;
export type GenreFilter = "default" | Genre;
export type TradeStatusFilter = "default" | "ON_SALE" | "SOLD_OUT" | "PENDING";
