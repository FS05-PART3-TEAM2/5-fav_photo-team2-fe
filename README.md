# 코드잇 풀스택 5기 2팀 최애의 포토

포토카드 거래 플랫폼 - 사용자가 자신의 포토카드를 등록하고, 판매하거나 다른 사용자와 교환할 수 있는 서비스입니다.

## 📌 프로젝트 소개

최애의 포토는 다음과 같은 기능을 제공합니다:

- **포토카드 등록**: 자신의 사진을 포토카드로 등록하고 관리
- **포토카드 판매**: 등록한 포토카드를 포인트로 판매
- **포토카드 교환**: 다른 사용자와 포토카드 교환 제안 및 수락
- **마이 갤러리**: 보유한 포토카드 관리
- **알림 시스템**: 거래 관련 알림 제공
- **포인트 시스템**: 랜덤 상자를 통한 포인트 획득 및 거래 사용

## 🛠 기술 스택

- **프론트엔드**: Next.js(App Router), TypeScript, React
- **상태 관리**: Zustand
- **스타일링**: CSS Modules / Tailwind CSS
- **배포**: Vercel

## 🏁 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 방법

```bash
# 저장소 클론
git https://github.com/FS05-PART3-TEAM2/5-fav_photo-team2-fe.git
cd 5-fav_photo-team2-fe

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 📂 프로젝트 구조

```
├── app/                 # Next.js App Router 구조
│   ├── auth/            # 인증 관련 페이지
│   ├── market/          # 마켓플레이스 페이지
│   ├── gallery/         # 마이 갤러리 페이지
│   ├── sales/           # 내 판매 포토카드 페이지
│   └── profile/         # 프로필 페이지
├── components/          # 리액트 컴포넌트
│   ├── common/          # 공통 UI 컴포넌트
│   ├── auth/            # 인증 관련 컴포넌트
│   ├── gnb/             # GNB 컴포넌트
│   ├── market/          # 마켓플레이스 컴포넌트
│   ├── gallery/         # 갤러리 컴포넌트
│   ├── sales/           # 판매 관련 컴포넌트
│   ├── notification/    # 알림 컴포넌트
│   ├── profile/         # 프로필 컴포넌트
│   └── point/           # 포인트 관련 컴포넌트
├── hooks/               # 커스텀 훅
├── lib/                 # 유틸리티 및 API 관련 코드
├── store/               # Zustand 상태 관리
├── types/               # TypeScript 타입 정의
├── styles/              # 전역 스타일
└── public/              # 정적 자산
```

## 📋 주요 기능

### 인증 시스템

- 회원가입
- 로그인/로그아웃

### 마켓플레이스

- 판매 중인 포토카드 목록 조회
- 필터링 및 검색 기능
- 정렬 및 무한 스크롤

### 포토카드 거래

- 포토카드 구매 (포인트 사용)
- 포토카드 교환 제안
- 교환 제안 승인/거절

### 마이 갤러리

- 보유 포토카드 조회
- 새 포토카드 등록
- 포토카드 판매 등록

### 판매 관리

- 판매 중인 포토카드 관리
- 판매 상태 확인

### 알림 시스템

- 거래 관련 알림 수신
- 교환 제안, 판매 성사, 매진 등 알림

### 포인트 시스템

- 랜덤 상자를 통한 포인트 획득
- 포인트로 포토카드 구매

## 👥 담당자 및 역할

| 이름 | 역할            | 담당 기능                             |
| ---- | --------------- | ------------------------------------- |
| 지영 | 프론트엔드 개발 | 로그인/회원가입, 포토카드 생성        |
| 한샘 | 프론트엔드 개발 | GNB, 알림 시스템, 프로필              |
| 세정 | 프론트엔드 개발 | 마켓플레이스 목록, 판매 모달          |
| 호은 | 프론트엔드 개발 | 포토카드 상세, 구매/교환 기능         |
| 하윤 | 프론트엔드 개발 | 마이 갤러리, 판매 목록, 포인트 시스템 |

## 🔍 기능 상세

### 포토카드 등록

- 이미지 업로드
- 카드 정보 입력 (이름, 등급, 장르, 설명 등)
- 발행량 설정

### 포토카드 판매

- 판매 가격 설정
- 판매 수량 설정
- 교환 희망 정보 입력

### 포토카드 교환

- 교환 제안 발송
- 제안 목록 조회
- 제안 승인/거절

### 알림 시스템

- 실시간 알림 표시
- 알림 타입별 분류
- 발생 시간 표시 (1시간 전, 1일 전 등)

## 📱 화면 구성

1. **인증 화면**

   - 로그인 페이지
   - 회원가입 페이지

2. **메인 레이아웃**

   - 헤더 (GNB)
   - 푸터

3. **마켓플레이스**

   - 카드 목록 화면
   - 판매 등록 모달
   - 카드 상세 페이지
   - 구매/교환 모달

4. **마이 갤러리**

   - 보유 카드 목록
   - 포토카드 생성 페이지

5. **판매 관리**

   - 판매 중인 카드 목록

6. **기타**
   - 랜덤 포인트 모달
   - 프로필 페이지
   - 알림 패널

## 🧪 테스트

```bash
# 테스트 실행
npm run test
# 또는
yarn test
```

## 🚀 배포

이 프로젝트는 Vercel을 통해 배포됩니다.

```bash
# 빌드
npm run build
# 또는
yarn build
```

## 📜 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

© 2023 PhotoCard Marketplace Team. All Rights Reserved.
