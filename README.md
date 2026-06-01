# MindPure

> 科学的心理学に基づく Big Five パーソナリティ診断アプリ

---

## 概要

MindPure は、Big Five（OCEAN モデル）を用いてユーザーの性格特性を可視化する Web アプリです。  
20問（クイック）／50問（精密）の2モードに対応し、統計的なパーセンタイル換算によって結果をレーダーチャートとバーグラフで表示します。

KH Studio ブランドのスプラッシュ画面から始まり、星空アニメーションと軌道ロゴで演出されたインタラクティブな診断体験を提供します。

## 目的（Why）
現代のストレス環境では、
「アプリを開く → 設定する → 使う」という手順が負担になり、
継続できない という課題がある。
MindPure は、
1タップで開始できる
設定不要
オフラインでも動く
心の状態を軽く整える
という “続けられるマインドフルネス” を目指して開発。

## 工夫した点
1タップで開始できる UI  
→ 呼吸ガイド・セルフチェックを最短で開始

オフラインファースト設計  
→ IndexedDB に保存し、通信不要で動作

継続しやすい UX  
→ 色・アニメーション・操作量を最小化
→ 心理的負担を減らすデザイン

PWA 対応  
→ ホーム画面追加、スプラッシュ画面、キャッシュ最適化

データのローカル保存  
→ プライバシーに配慮しつつ、履歴を振り返れる

---

## 技術スタック

| 役割 | 使用技術 |
|---|---|
| UI フレームワーク | React 18 |
| スタイリング | Tailwind CSS v3 |
| チャート | Recharts |
| ビルドツール | Vite |
| 実行環境 | Nginx (Docker) |
| フォント | Orbitron / DM Sans / Noto Sans JP |

---

## フォルダ構成

```
mindpure/
├── index.html                  # Vite エントリ HTML
├── vite.config.js              # Vite 設定
├── tailwind.config.js          # Tailwind 設定
├── postcss.config.js           # PostCSS 設定
├── package.json
├── Dockerfile                  # マルチステージビルド (Node → Nginx)
├── docker-compose.yml
├── nginx.conf                  # SPA ルーティング対応 Nginx 設定
├── README.md
└── src/
    ├── main.jsx                # React マウントポイント
    ├── App.jsx                 # ルーティング & グローバル状態管理
    ├── styles/
    │   └── global.css          # アニメーション・グラスパネル等
    ├── data/
    │   ├── questions.js        # 50問データ・回答選択肢定数
    │   └── norms.js            # Big Five 正規分布パラメータ (平均・標準偏差)
    ├── utils/
    │   └── scoring.js          # スコア集計・パーセンタイル変換ロジック
    └── components/
        ├── SplashScreen.jsx    # 星空 Canvas アニメーション + KH Studio ロゴ
        ├── LandingView.jsx     # モード選択トップ画面
        ├── QuizView.jsx        # 設問表示・進捗バー
        └── ResultView.jsx      # レーダーチャート + 特性バー結果画面
```

---

## セットアップ

### ローカル開発

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動 (http://localhost:5173)
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

### Docker 環境

```bash
# ビルド & 起動
docker compose up --build

# バックグラウンドで起動
docker compose up -d --build

# 停止
docker compose down
```

起動後、`http://localhost:3000` でアクセスできます。

---

## 診断ロジック

### スコア計算

各設問は Big Five の5因子（O / C / E / A / N）のいずれかに対応しています。  
逆転項目（`reverse: true`）は `6 - 回答値` で補正します。

```
因子スコア = 各設問の補正済み回答値の平均
```

### パーセンタイル換算

因子スコアを正規分布パラメータ（平均・標準偏差）で標準化し、パーセンタイルに変換します。

```
z = (因子スコア - 母集団平均) / 母集団標準偏差
パーセンタイル = round( 0.5 × (1 + tanh(0.85 × z)) × 100 )
```

### Big Five 因子

| 記号 | 因子名 | 説明 |
|---|---|---|
| O | 開放性 | 知的好奇心・芸術的感受性・新しい経験への開放度 |
| C | 誠実性 | 自己規律・責任感・計画性 |
| E | 外向性 | 社交性・活動性・積極性 |
| A | 協調性 | 思いやり・信頼・協力性 |
| N | 神経症的傾向 | 情緒不安定性・ストレス感受性 |

---

## Docker 構成詳細

### マルチステージビルド

```
Stage 1 (build): node:20-alpine
  └─ npm install → npm run build → /app/dist 生成

Stage 2 (serve): nginx:stable-alpine
  └─ /app/dist を Nginx で配信
```

### ポートマッピング

| ホスト | コンテナ | 用途 |
|---|---|---|
| 3000 | 80 | Nginx HTTP |

### Nginx 設定のポイント

SPA のリロード対策として `try_files` でフォールバックを設定しています。

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## 環境変数

現バージョンでは環境変数の設定は不要です。  
API 連携等を追加する場合は `.env` ファイルを作成し、`VITE_` プレフィックスをつけて定義してください。

```env
VITE_API_BASE_URL=https://example.com/api
```

---

## 今後の拡張案

- 結果の PDF エクスポート機能
- 診断履歴の LocalStorage 保存
- 多言語対応（英語・中国語）
- ユーザー認証 + クラウド保存
- 設問セットのカスタマイズ機能

---

## ライセンス

© 2025 KH Studio — All rights reserved.
