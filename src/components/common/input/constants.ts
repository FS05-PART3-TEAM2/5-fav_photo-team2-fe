export const FORM_CONFIG = {
  Input: {
    photoCardName: {
      label: "포토카드 이름",
      placeholder: "포토카드 이름을 입력해 주세요",
    },
    email: { label: "이메일", placeholder: "이메일을 입력해주세요" },
    nickname: { label: "닉네임", placeholder: "닉네임을 입력해주세요" },
    price: { label: "가격", placeholder: "가격을 입력해 주세요" },
    stock: { label: "총 발행량", placeholder: "총 발행량을 입력해 주세요" },
  },
  Textarea: {
    photoCardContent: {
      label: "포토카드 설명",
      placeholder: "카드 설명을 입력해 주세요",
      height: 220, // textarea height
    },
    wishContent: {
      label: "교환 희망 설명",
      placeholder: "교환 희망 설명을 입력해 주세요",
      height: 120, // textarea height
    },
  },
  Password: {
    password: { label: "비밀번호", placeholder: "비밀번호를 입력해주세요" },
    passwordConfirm: {
      label: "비밀번호 확인",
      placeholder: "비밀번호를 확인해주세요",
    },
  },
  Dropdown: {
    grade: {
      label: "등급",
      placeholder: "등급을 선택해 주세요",
      options: {
        COMMON: "COMMON",
        RARE: "RARE",
        SUPER_RARE: "SUPER RARE",
        LEGENDARY: "LEGENDARY",
      },
    },
    genre: {
      label: "장르",
      placeholder: "장르를 선택해 주세요",
      options: {
        travel: "여행",
        landscape: "풍경",
        portrait: "인물",
        object: "사물",
      },
    },
  },
};
