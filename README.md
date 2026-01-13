# 문명: 위대한 유산 (Civilization: Great Legacy) 🏛️🚀

원시 시대부터 우주 시대까지, 당신만의 문명을 발전시키는 웹 기반 역사 시뮬레이션 클리커 게임입니다.
React와 Vite를 기반으로 하며, Google Gemini API를 활용한 AI 기능이 포함되어 있습니다.

## ✨ 주요 기능

- **시대 발전 시스템**: 원시, 고대, 중세, 산업, 현대, 우주 시대로 이어지는 6단계 발전 과정
- **다양한 문명 선택**: 호모 사피엔스, 네안데르탈인, 아틀란티스인 등 각기 다른 특성을 가진 종족 플레이
- **자원 및 건설**: 식량, 생산력, 과학 3가지 자원을 관리하고 건물을 건설/강화
- **기술 연구 트리**: 시대를 앞서가는 다양한 기술 연구 및 잠금 해제 (시각 트리를 통한 직관적인 연구)
- **재해 시스템**: 시대별로 발생하는 랜덤 재해(가뭄, 홍수, 금융 위기 등) 극복
- **불가사의(Wonder)**: 막대한 자원을 투입하여 문명 고유의 불가사의 건설 (강력한 영구 버프)
- **AI 신탁 & 조언**: Google Gemini AI가 상황에 맞는 전략을 조언하거나, 신탁(랜덤 이벤트)을 내려줌
- **저장/불러오기**: 브라우저 로컬 스토리지(Local Storage)를 이용한 3개의 세이브 슬롯 지원

## 🚀 실행 및 배포 방법

이 프로젝트는 Vite + React 환경에서 개발되었습니다.

### 로컬 실행 (Development)
1. 저장소를 클론합니다.
2. 의존성을 설치합니다: `npm install`
3. 개발 서버를 실행합니다: `npm run dev`

### 빌드 및 배포 (Production)
이 프로젝트는 GitHub Pages 배포를 지원합니다.

1. **원클릭 배포**: 프로젝트 루트의 `deploy.bat` 파일을 실행합니다.
2. **수동 배포**: 터미널에서 `npm run deploy`를 실행합니다.

배포된 게임은 다음 링크에서 즐길 수 있습니다:
**[Civilization: Great Legacy 플레이하기](https://RockBeider.github.io/Civilization_Game/)**

## 🛠️ 기술 스택

- **Build Tool**: Vite
- **Framework**: React 18
- **Styling**: SCSS (Sass), CSS Modules
- **Icons**: Lucide React Icons
- **AI Integration**: Google Gemini API

## 🤖 AI 기능 설정 (선택 사항)

게임 내 [설정] 메뉴에서 본인의 Google Gemini API Key를 입력하면 다음 기능을 사용할 수 있습니다:

- **전략 조언가**: 현재 자원과 건물 상태를 분석하여 최적의 전략 제안
- **역사 요약**: 플레이 로그를 바탕으로 문명 연대기 작성
- **신탁(Oracle)**: 과학력을 소모하여 AI가 생성하는 랜덤 축복/저주 이벤트 발생

## 📂 파일 구조

```
/
├── dist/               # 빌드 결과물
├── public/             # 정적 리소스
├── src/
│   ├── components/     # React 컴포넌트
│   ├── styles/         # SCSS 스타일 파일
│   ├── game.js         # 메인 게임 로직
│   └── main.jsx        # 진입점
├── deploy.bat          # 배포 스크립트
└── vite.config.js      # Vite 설정
```

## 📝 라이선스

이 프로젝트는 학습 및 포트폴리오 목적으로 제작되었습니다. 자유롭게 수정하고 배포할 수 있습니다.
