# Minseon Park — Portfolio

컴퓨터 비전 연구자 박민선의 학술 포트폴리오 사이트입니다. 별도의 빌드 과정이나 프레임워크 없이 GitHub Pages에서 바로 배포할 수 있습니다.

## 미리 보기

`index.html`을 브라우저에서 열거나 아래 명령으로 로컬 서버를 실행합니다.

```bash
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 엽니다.

## GitHub Pages 배포

1. GitHub에서 `pms01260.github.io` 이름의 public repository를 만듭니다.
2. 이 폴더의 모든 파일을 repository의 기본 브랜치에 업로드합니다.
3. **Settings → Pages → Build and deployment**에서 `Deploy from a branch`와 `main / (root)`를 선택합니다.
4. 잠시 후 `https://pms01260.github.io`에서 확인합니다.

## 파일 구성

- `index.html`: 전체 콘텐츠와 구조
- `styles.css`: 학술 홈페이지 스타일의 반응형 디자인
- `script.js`: 모바일 메뉴, 현재 섹션 표시, 노션식 활동 페이지 보기
- `assets/CV_MinseonPark.pdf`: 다운로드용 영문 CV
- `assets/profile.png`: GitHub 프로필 그래픽
- `assets/kcc-project.png`: KCC 연구 대표 이미지
- `assets/activities/`: 활동 페이지의 이미지, 동영상, PDF, 노트북 HTML

연락처, 논문, 프로젝트를 수정할 때는 `index.html`의 해당 문구만 변경하면 됩니다.

활동(`#activities`)은 노션 "대학 활동 모음" 갤러리를 옮긴 것입니다. 카드(`.n-card`)의 `data-page="이름"`이 페이지 하단의 `<template id="notion-이름">`을 가리키며, 카드를 누르면 해당 페이지가 노션처럼 창으로 열립니다. 페이지 안의 `data-page` 링크로 하위 페이지를 열 수 있습니다.
