## 安裝
### 1. Install the dependencies
```bash
yarn
```

### 2. Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### 3. Lint the files
```bash
yarn run lint
```

### 4. Build the app for production
```bash
quasar build
```

### 5. Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## 流程

```txt
進入網站 - 初始化(取得文, 取得設定)
  -> 註冊
  -> 登入
____________訪客狀態_____
------------登入狀態-----
    -> 登出
    -> 檢舉文
    -> 貼文
      -> 修文
      -> 刪文
```
