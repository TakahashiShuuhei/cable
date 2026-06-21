# 電線管占有率計算アプリ 実装計画

## プロジェクト概要
電線管の占有率を計算するPWAアプリ。オフライン対応、スマホメイン（PC対応）、2つのテーマ切り替え機能、計算履歴の保存・呼び出し、計算結果の共有機能を持つ。

## 技術スタック
- **フレームワーク**: React 18 + Vite
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **PWA**: vite-plugin-pwa
- **デプロイ**: GitHub Pages (GitHub Actions)
- **状態管理**: React Context
- **テーマ**: シンプル / 工事現場向け（切り替え可能）
- **テスト**: Vitest (TDD)

## 開発手法
- **ドメイン駆動設計 (DDD)**: ドメインロジックをUIから分離
- **テスト駆動開発 (TDD)**: Red → Green → Refactor サイクル

## プロジェクト構造

```
cable/
├── docs/
│   ├── plan.md                  # 実装計画（このファイル）
│   ├── domain-specification.md  # ドメイン仕様
│   ├── domain-model.md          # ドメインモデル設計
│   └── wire-specifications.json # 電線仕様データ
├── public/
│   └── icons/                   # PWAアイコン
├── src/
│   ├── domain/                  # ドメイン層（DDDコア）
│   │   ├── models/              # エンティティ・値オブジェクト
│   │   │   ├── Conduit.ts       # 電線管モデル
│   │   │   ├── Wire.ts          # 電線モデル
│   │   │   └── OccupancyRate.ts # 占有率値オブジェクト
│   │   ├── services/            # ドメインサービス
│   │   │   └── OccupancyCalculator.ts
│   │   └── __tests__/           # ドメイン層テスト
│   │       ├── Conduit.test.ts
│   │       ├── Wire.test.ts
│   │       └── OccupancyCalculator.test.ts
│   ├── data/                    # マスターデータ
│   │   ├── conduits.ts
│   │   └── wires.ts
│   ├── application/             # アプリケーション層
│   │   └── useCases/
│   ├── infrastructure/          # インフラ層
│   │   ├── storage.ts           # LocalStorage
│   │   └── sharing.ts           # URL共有
│   ├── presentation/            # プレゼンテーション層
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── styles/
│   ├── App.tsx
│   └── main.tsx
├── .github/workflows/
│   └── deploy.yml
├── package.json
├── vite.config.ts
├── vitest.config.ts             # Vitest設定
├── tailwind.config.js
└── tsconfig.json
```

## 実装フェーズ（TDDアプローチ）

### Phase 1: セットアップ
1. Viteプロジェクト作成
2. 依存関係インストール（Vitest含む）
3. Tailwind設定
4. ディレクトリ構造作成

### Phase 2: ドメイン層（TDD）
1. **テスト先行**: Conduit（電線管）モデルのテスト作成
2. **実装**: Conduitモデル実装
3. **テスト先行**: Wire（電線）モデルのテスト作成
4. **実装**: Wireモデル実装
5. **テスト先行**: OccupancyCalculatorのテスト作成
6. **実装**: OccupancyCalculator実装

### Phase 3: インフラ層
1. マスターデータ（conduits.ts, wires.ts）
2. storage.ts（LocalStorage）
3. sharing.ts（URL共有）

### Phase 4: プレゼンテーション層
1. テーマシステム
2. Context設定
3. UIコンポーネント

### Phase 5: PWA対応

### Phase 6: デプロイ

## 参考URL

- 電線管占有率の基礎知識: https://keisouya-no-chie.com/conduit-fill-rate/
- 電線の仕様: https://www.densen-store.com/user_data/electric
