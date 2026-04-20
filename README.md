# MindPure — 科学的心理学アプリ

Big Five パーソナリティ診断アプリ。  
KH Studio ブランドのスプラッシュ画面から始まり、20問 / 50問の2モードで性格特性をパーセンタイル表示します。

## 技術スタック

| 役割        | ライブラリ              |
|-----------|----------------------|
| UI        | React 18 + JSX       |
| スタイル      | Tailwind CSS v3      |
| チャート      | Recharts             |
| ビルドツール   | Vite                 |
| フォント      | Orbitron / DM Sans / Noto Sans JP (Google Fonts) |

## フォルダ構成

```
mindpure/
├── index.html                  # Vite エントリ HTML
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # React マウント
    ├── App.jsx                 # ルーティング & 状態管理
    ├── styles/
    │   └── global.css          # アニメーション・グラス等のスタイル
    ├── data/
    │   ├── questions.js        # 50問データ・回答選択肢
    │   └── norms.js            # Big Five 正規分布パラメータ
    ├── utils/
    │   └── scoring.js          # スコア計算・パーセンタイル変換
    └── components/
        ├── SplashScreen.jsx    # 星空アニメーション + KH ロゴ
        ├── LandingView.jsx     # モード選択画面
        ├── QuizView.jsx        # 設問・進捗バー画面
        └── ResultView.jsx      # レーダーチャート + バー結果画面
```

## セットアップ

```bash
npm install
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run preview  # ビルド結果をプレビュー
```
