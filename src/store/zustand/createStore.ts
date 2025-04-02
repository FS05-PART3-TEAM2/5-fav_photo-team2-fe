import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const createStore = <T>(
  // StateCreator: Zustand의 store 생성자 타입
  // T: store의 상태 타입
  // [['zustand/devtools', never], ['zustand/immer', never]]: 적용된 미들웨어 타입
  initializer: StateCreator<T, [["zustand/devtools", never], ["zustand/immer", never]]>
) =>
  // create 함수에 미들웨어들을 체이닝
  // devtools(immer(initializer)): immer를 먼저 적용하고, 그 다음 devtools를 적용
  create<T, [["zustand/devtools", never], ["zustand/immer", never]]>(devtools(immer(initializer)));
