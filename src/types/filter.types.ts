import { Genre, Grade, TradeStatus } from "./photocard.types";

// 필터 관련 타입 정의
// XXX: 여기 백쪽에서는 굳이 grade=default 이런식으로 쿼리를 보내지 않아도 그냥 값을 안보내면 전체조회라고 합니다! 그래서 필터타입은 사용하지 않아도 될 것 같은데 우선 파일은 그대로 살려두겠습니다. 쿼리키 사용해서 api 요청보낼때 문제가 생기면 수정해서 사용하시면 될 것 같습니다.
export type GradeFilter = "default" | Grade;
export type GenreFilter = "default" | Genre;
export type TradeStatusFilter = "default" | TradeStatus;
