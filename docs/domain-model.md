# ドメインモデル設計書

## 概要

本ドキュメントでは、電線管占有率計算アプリのドメインモデルをDDD（ドメイン駆動設計）のアプローチで設計する。

## ユビキタス言語（Ubiquitous Language）

| 用語 | 英語 | 説明 |
|------|------|------|
| 電線管 | Conduit | 電線を収容する管 |
| 電線 | Wire | 電線管に収容される電線・ケーブル |
| 占積率 | Occupancy Rate | 電線断面積合計 ÷ 管内断面積 × 100 |
| 内径 | Inner Diameter | 管の内側の直径 |
| 外径 | Outer Diameter | 電線の外側の直径 |
| 断面積 | Cross Section Area | 円の面積 (π × r²) |
| 複合 | Mixed | 異なるサイズの電線が混在する状態 |
| 基準値 | Standard Limit | 32% または 48% |

---

## 値オブジェクト（Value Objects）

### Diameter（直径）

不変の値オブジェクト。直径を表す。

```typescript
class Diameter {
  private constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('直径は正の値である必要があります');
    }
  }

  static of(mm: number): Diameter {
    return new Diameter(mm);
  }

  get mm(): number {
    return this.value;
  }

  toArea(): Area {
    return Area.fromDiameter(this);
  }

  equals(other: Diameter): boolean {
    return this.value === other.value;
  }
}
```

### Area（面積）

不変の値オブジェクト。断面積を表す。

```typescript
class Area {
  private constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('面積は正の値である必要があります');
    }
  }

  static of(mm2: number): Area {
    return new Area(mm2);
  }

  static fromDiameter(diameter: Diameter): Area {
    const r = diameter.mm / 2;
    return new Area(Math.PI * r * r);
  }

  get mm2(): number {
    return this.value;
  }

  add(other: Area): Area {
    return new Area(this.value + other.value);
  }

  multiply(count: number): Area {
    return new Area(this.value * count);
  }

  divideBy(other: Area): number {
    return this.value / other.value;
  }

  equals(other: Area): boolean {
    return Math.abs(this.value - other.value) < 0.001;
  }
}
```

### OccupancyRate（占有率）

不変の値オブジェクト。占有率を表す。

```typescript
type WarningLevel = 'safe' | 'warning' | 'danger';

class OccupancyRate {
  private constructor(
    private readonly percentage: number,
    private readonly isMixed: boolean
  ) {}

  static calculate(wireArea: Area, conduitArea: Area, isMixed: boolean): OccupancyRate {
    const percentage = (wireArea.mm2 / conduitArea.mm2) * 100;
    return new OccupancyRate(percentage, isMixed);
  }

  get value(): number {
    return this.percentage;
  }

  get standardLimit(): 32 | 48 {
    return this.isMixed ? 32 : 48;
  }

  get isWithinLimit(): boolean {
    return this.percentage <= this.standardLimit;
  }

  get warningLevel(): WarningLevel {
    if (this.percentage <= 32) {
      return 'safe';
    }
    if (this.percentage <= 48 && !this.isMixed) {
      return 'warning';
    }
    return 'danger';
  }

  get hasMixedSizes(): boolean {
    return this.isMixed;
  }
}
```

---

## エンティティ（Entities）

### ConduitType（電線管種類）

電線管の種類を表すエンティティ。

```typescript
interface ConduitTypeProps {
  id: string;
  name: string;
  fullName: string;
  material: string;
}

class ConduitType {
  constructor(private readonly props: ConduitTypeProps) {}

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get fullName(): string { return this.props.fullName; }
  get material(): string { return this.props.material; }
}
```

### Conduit（電線管）

電線管エンティティ。

```typescript
interface ConduitProps {
  id: string;
  type: ConduitType;
  nominalSize: string;
  innerDiameter: Diameter;
}

class Conduit {
  constructor(private readonly props: ConduitProps) {}

  get id(): string { return this.props.id; }
  get type(): ConduitType { return this.props.type; }
  get nominalSize(): string { return this.props.nominalSize; }
  get innerDiameter(): Diameter { return this.props.innerDiameter; }

  get innerArea(): Area {
    return this.innerDiameter.toArea();
  }

  get displayName(): string {
    return `${this.type.name} ${this.nominalSize}`;
  }
}
```

### WireType（電線種類）

電線の種類を表すエンティティ。

```typescript
interface WireTypeProps {
  id: string;
  name: string;
  fullName: string;
  description: string;
}

class WireType {
  constructor(private readonly props: WireTypeProps) {}

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get fullName(): string { return this.props.fullName; }
  get description(): string { return this.props.description; }
}
```

### WireSpec（電線仕様）

電線の仕様を表すエンティティ。

```typescript
interface WireSpecProps {
  id: string;
  type: WireType;
  size: string;
  unit: 'mm' | 'sq';
  cores?: number;
  outerDiameter?: Diameter;
  equivalentDiameter?: Diameter; // VVFなど扁平ケーブル用
  crossSectionArea: Area;
  allowableCurrent?: number;
}

class WireSpec {
  constructor(private readonly props: WireSpecProps) {}

  get id(): string { return this.props.id; }
  get type(): WireType { return this.props.type; }
  get size(): string { return this.props.size; }
  get unit(): 'mm' | 'sq' { return this.props.unit; }
  get cores(): number | undefined { return this.props.cores; }
  get crossSectionArea(): Area { return this.props.crossSectionArea; }

  get displayName(): string {
    const coreStr = this.cores ? `-${this.cores}C` : '';
    return `${this.type.name} ${this.size}${this.unit}${coreStr}`;
  }

  /**
   * この電線仕様が他の電線仕様と同じ「サイズ」かどうかを判定
   * 複合判定に使用
   */
  isSameSize(other: WireSpec): boolean {
    return this.crossSectionArea.equals(other.crossSectionArea);
  }
}
```

---

## 集約（Aggregates）

### WireSelection（電線選択）

電線の選択と数量を管理する集約。

```typescript
interface WireSelectionProps {
  id: string;
  wireSpec: WireSpec;
  quantity: number;
}

class WireSelection {
  constructor(private props: WireSelectionProps) {
    if (props.quantity < 1) {
      throw new Error('数量は1以上である必要があります');
    }
  }

  get id(): string { return this.props.id; }
  get wireSpec(): WireSpec { return this.props.wireSpec; }
  get quantity(): number { return this.props.quantity; }

  get totalArea(): Area {
    return this.wireSpec.crossSectionArea.multiply(this.quantity);
  }

  updateQuantity(newQuantity: number): WireSelection {
    if (newQuantity < 1) {
      throw new Error('数量は1以上である必要があります');
    }
    return new WireSelection({
      ...this.props,
      quantity: newQuantity
    });
  }
}
```

### OccupancyCalculation（占有率計算）

占有率計算のルート集約。

```typescript
class OccupancyCalculation {
  private constructor(
    private readonly conduit: Conduit,
    private readonly wireSelections: WireSelection[]
  ) {}

  static create(conduit: Conduit): OccupancyCalculation {
    return new OccupancyCalculation(conduit, []);
  }

  addWire(selection: WireSelection): OccupancyCalculation {
    return new OccupancyCalculation(
      this.conduit,
      [...this.wireSelections, selection]
    );
  }

  removeWire(selectionId: string): OccupancyCalculation {
    return new OccupancyCalculation(
      this.conduit,
      this.wireSelections.filter(w => w.id !== selectionId)
    );
  }

  updateWireQuantity(selectionId: string, quantity: number): OccupancyCalculation {
    return new OccupancyCalculation(
      this.conduit,
      this.wireSelections.map(w =>
        w.id === selectionId ? w.updateQuantity(quantity) : w
      )
    );
  }

  get totalWireArea(): Area {
    if (this.wireSelections.length === 0) {
      return Area.of(0.001); // ゼロ除算回避
    }
    return this.wireSelections.reduce(
      (sum, w) => sum.add(w.totalArea),
      Area.of(0.001)
    );
  }

  get isMixed(): boolean {
    if (this.wireSelections.length <= 1) {
      return false;
    }
    const first = this.wireSelections[0].wireSpec;
    return this.wireSelections.some(w => !w.wireSpec.isSameSize(first));
  }

  calculate(): OccupancyRate {
    return OccupancyRate.calculate(
      this.totalWireArea,
      this.conduit.innerArea,
      this.isMixed
    );
  }
}
```

---

## ドメインサービス（Domain Services）

### OccupancyCalculator

占有率計算のドメインサービス。

```typescript
class OccupancyCalculator {
  /**
   * 電線の総断面積を計算
   */
  static calculateTotalWireArea(selections: WireSelection[]): Area {
    if (selections.length === 0) {
      return Area.of(0.001);
    }
    return selections.reduce(
      (sum, s) => sum.add(s.totalArea),
      Area.of(0.001)
    );
  }

  /**
   * 複合（異なるサイズの電線混在）かどうかを判定
   */
  static isMixedWires(selections: WireSelection[]): boolean {
    if (selections.length <= 1) {
      return false;
    }
    const firstSpec = selections[0].wireSpec;
    return selections.some(s => !s.wireSpec.isSameSize(firstSpec));
  }

  /**
   * 占有率を計算
   */
  static calculate(
    conduit: Conduit,
    selections: WireSelection[]
  ): OccupancyRate {
    const totalArea = this.calculateTotalWireArea(selections);
    const isMixed = this.isMixedWires(selections);
    return OccupancyRate.calculate(totalArea, conduit.innerArea, isMixed);
  }
}
```

---

## リポジトリインターフェース（Repository Interfaces）

### ConduitRepository

```typescript
interface ConduitRepository {
  findAll(): Conduit[];
  findById(id: string): Conduit | undefined;
  findByType(typeId: string): Conduit[];
}
```

### WireSpecRepository

```typescript
interface WireSpecRepository {
  findAll(): WireSpec[];
  findById(id: string): WireSpec | undefined;
  findByType(typeId: string): WireSpec[];
}
```

### HistoryRepository

```typescript
interface CalculationHistory {
  id: string;
  timestamp: Date;
  conduit: Conduit;
  wireSelections: WireSelection[];
  result: OccupancyRate;
  label?: string;
}

interface HistoryRepository {
  save(history: CalculationHistory): void;
  findAll(): CalculationHistory[];
  findById(id: string): CalculationHistory | undefined;
  delete(id: string): void;
  clear(): void;
}
```

---

## アプリケーションサービス（Application Services）

### CalculationService

```typescript
class CalculationService {
  constructor(
    private readonly conduitRepo: ConduitRepository,
    private readonly wireSpecRepo: WireSpecRepository,
    private readonly historyRepo: HistoryRepository
  ) {}

  calculateOccupancy(
    conduitId: string,
    wireSelectionDTOs: { wireSpecId: string; quantity: number }[]
  ): OccupancyRate {
    const conduit = this.conduitRepo.findById(conduitId);
    if (!conduit) {
      throw new Error('電線管が見つかりません');
    }

    const selections = wireSelectionDTOs.map((dto, index) => {
      const wireSpec = this.wireSpecRepo.findById(dto.wireSpecId);
      if (!wireSpec) {
        throw new Error('電線仕様が見つかりません');
      }
      return new WireSelection({
        id: `selection-${index}`,
        wireSpec,
        quantity: dto.quantity
      });
    });

    return OccupancyCalculator.calculate(conduit, selections);
  }

  saveToHistory(
    conduit: Conduit,
    selections: WireSelection[],
    result: OccupancyRate,
    label?: string
  ): void {
    this.historyRepo.save({
      id: crypto.randomUUID(),
      timestamp: new Date(),
      conduit,
      wireSelections: selections,
      result,
      label
    });
  }
}
```

---

## レイヤー構成

```
src/
├── domain/                    # ドメイン層（ビジネスロジック）
│   ├── models/
│   │   ├── values/            # 値オブジェクト
│   │   │   ├── Diameter.ts
│   │   │   ├── Area.ts
│   │   │   └── OccupancyRate.ts
│   │   ├── entities/          # エンティティ
│   │   │   ├── ConduitType.ts
│   │   │   ├── Conduit.ts
│   │   │   ├── WireType.ts
│   │   │   └── WireSpec.ts
│   │   └── aggregates/        # 集約
│   │       ├── WireSelection.ts
│   │       └── OccupancyCalculation.ts
│   ├── services/              # ドメインサービス
│   │   └── OccupancyCalculator.ts
│   ├── repositories/          # リポジトリインターフェース
│   │   ├── ConduitRepository.ts
│   │   ├── WireSpecRepository.ts
│   │   └── HistoryRepository.ts
│   └── __tests__/             # ドメイン層テスト
│
├── application/               # アプリケーション層
│   ├── services/
│   │   └── CalculationService.ts
│   └── dto/                   # データ転送オブジェクト
│
├── infrastructure/            # インフラストラクチャ層
│   ├── repositories/          # リポジトリ実装
│   │   ├── InMemoryConduitRepository.ts
│   │   ├── InMemoryWireSpecRepository.ts
│   │   └── LocalStorageHistoryRepository.ts
│   ├── data/                  # マスターデータ
│   │   ├── conduits.ts
│   │   └── wires.ts
│   └── sharing/               # 共有機能
│       └── UrlSharing.ts
│
└── presentation/              # プレゼンテーション層
    ├── components/
    ├── contexts/
    ├── hooks/
    └── styles/
```

---

## TDDによる実装順序

### 1. 値オブジェクト（Red → Green → Refactor）

1. `Diameter.test.ts` → `Diameter.ts`
2. `Area.test.ts` → `Area.ts`
3. `OccupancyRate.test.ts` → `OccupancyRate.ts`

### 2. エンティティ

4. `Conduit.test.ts` → `Conduit.ts`
5. `WireSpec.test.ts` → `WireSpec.ts`

### 3. 集約・ドメインサービス

6. `WireSelection.test.ts` → `WireSelection.ts`
7. `OccupancyCalculator.test.ts` → `OccupancyCalculator.ts`

### 4. インフラストラクチャ層

8. リポジトリ実装
9. マスターデータ読み込み

### 5. プレゼンテーション層

10. コンポーネント実装

---

## 不変条件（Invariants）

1. **直径・面積は正の値**: `Diameter > 0`, `Area > 0`
2. **数量は1以上の整数**: `quantity >= 1`
3. **占有率は0以上**: `OccupancyRate >= 0`
4. **複合時は32%基準**: `isMixed === true` → `standardLimit === 32`
