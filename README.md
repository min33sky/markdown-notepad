# markdown-notes-app

## Project Setup

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

### Note

1. 빌드할 때 `errorOut=ERROR: Cannot create symbolic link ` 에러가 발생한다면 **관리자 권한**으로 터미널을 실행해 빌드한다.

2. MDX Editor 사용 시 'unsafe-eval' 에러가 발생할 경우 `index.html`의 head를 아래와 같이 수정해준다.

```html
<head>
  <meta charset="UTF-8" />
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval';"
  />
</head>
```
