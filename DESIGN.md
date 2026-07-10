# PinkieTech Website Design System

Status: Working Draft v0.1
Purpose: PinkieTechのブランド基盤を、公式Webサイトで再現可能な視覚・組版・レイアウト仕様へ変換する

この文書は、ブランド管理リポジトリの `docs/website-design-system.md` を同期したWeb実装用の基準である。内容が競合する場合は、ブランド管理リポジトリの `brand-foundation.md`、`brand-guidelines.md`、デザイントークン、Webデザインシステムの順に優先する。

## 1. Visual Theme and Atmosphere

PinkieTechの公式Webサイトは、**ダークテーマを推奨表現**とする。

ただし、一般的な技術系サイトのように、ネオン、グリッド、発光、回路、端末画面で未来感を演出しない。名刺と同じく、暗い面の中で正式なリバースロゴ、余白、白い文字、限られたオレンジを際立たせる。

- **Human** — 暗い画面でも冷たくせず、温かいオレンジと自然な日本語で人を感じさせる。
- **Practical** — 情報の順序と次の行動が明快で、装飾より理解を優先する。
- **Engineered** — 整ったグリッドと一貫した寸法を持つが、罫線や箱を増やしすぎない。
- **Editorial** — 同じ大きさのカードを並べず、文章、余白、写真、数字の大小でリズムを作る。

キーワード: 温かい暗さ、編集的、実践的、精密、静かな自信、話しかけやすい専門性。

## 2. Source Hierarchy and References

判断の優先順位:

1. `docs/brand-foundation.md` — 意味、人格、メッセージ
2. `docs/brand-guidelines.md` — ロゴ、色、文字、写真
3. `assets/brand/tokens/pinkietech.tokens.json` — 実装値
4. この文書 — Web固有の構図と振る舞い
5. 外部参考資料 — 分析の語彙と比較材料

外部参考資料は、いずれもMITライセンスのDESIGN.mdコレクションである。個別ブランドの見た目、固有書体、構図を複製せず、次の設計原則だけをPinkieTechの基準へ翻訳する。

| Reference | Adopted principle | Do not copy |
| --- | --- | --- |
| `VoltAgent/awesome-design-md` | 意味を持つトークン、状態、レスポンシブ、Do / Don'tを一つの仕様へまとめる形式 | 個別企業のブランドカラー、固有書体、特徴的な画面構成 |
| `kzhrknt/awesome-design-md-jp` | 日本語フォント、行間、禁則処理、和欧混植、タッチ領域を明記する形式 | 分析対象サイトの視覚的な署名 |
| Takram analysis | 余白と文字で構造を作り、影やカードへ頼らない編集性 | 固有書体、極端に狭い日本語行間、モノクロの模倣 |
| SmartHR analysis | 温かいニュートラル、アクセシビリティ、業務情報の明快さ | 青・水色の配色、SaaSプロダクトUIの外観 |
| MUJI analysis | 装飾を抑え、余白と素材感で温度を作る姿勢 | きなり・赤の配色、商品サイトの構成 |
| Claude analysis | 暖色と暗色を人間的に組み合わせる考え方 | セリフ見出し、コーラル、AIブランド固有の表現 |
| IBM / OMRON analysis | 寸法の一貫性、情報構造、技術的信頼 | 青いコーポレート配色、重い企業サイト表現 |

## 3. Color Palette and Roles

### Dark-first surfaces

| Role | Token / Value | Use |
| --- | --- | --- |
| Deep canvas | `surfaceInverseDeep` / `#050608` | ページ背景、ヘッダー、フッター |
| Main dark surface | `surfaceInverse` / `#111827` | セクション、主要な情報面 |
| Subtle dark surface | `surfaceInverseSubtle` / `#0B0E13` | ストーリーなど静かな区別が必要な面 |
| Elevated dark surface | `surfaceInverseElevated` / `#182131` | 限定的な補助面、開閉領域 |
| Primary text | `textInverse` / `#FFFFFF` | 見出し、本文、主要ラベル |
| Secondary text | `textInverseMuted` / `#B8BEC8` | 補足、説明、メタ情報 |
| Subtle text | `textInverseSubtle` / `#858D99` | 小さな番号、著作権、補助ラベル |
| Dark border | `borderInverse` / `#343D4A` | 意味のある区切り線 |
| Soft dark border | `borderInverseSoft` / `#242C38` | 同一セクション内の弱い区切り線 |
| Brand action | `brandOrange` / `#E86A2D` | 主要CTA、重要な印、短い罫線 |
| Information | `teal` / `#0DA5A4` | 接続、計測、状態。小面積のみ |

### Dark-theme proportion

- 72%: Deep canvas / Main dark surface
- 20%: White / muted text / meaningful lines
- 6%: Orange
- 2%: Teal

Orangeを大きな帯、全面背景、複数の競合CTAへ使わない。Tealは装飾色として散らさず、状態や情報の意味がある場所だけに使う。

## 4. Logo

- ダークテーマでは `public/brand/pinkietech-logo-reverse.svg` を第一選択とする。
- 初回接触のヘッダーとフッターでは、シンボル単体や文字による再現ではなく、正式な横組みロゴを使う。
- Webサイト側でワードマークをフォント入力して再構成しない。
- ヘッダーの推奨表示幅はDesktop `190–220px`、Mobile `160px`。最小幅`160px`を守る。
- 大きな背景シンボルを使う場合は正式なマークを単色・低コントラストで置き、本文の可読性を損なわない。ロゴ自体へ透明度、影、発光などの効果を加えない。

## 5. Typography

### Font stacks

```css
/* 本文と日本語見出し */
font-family: Inter, "Noto Sans JP", system-ui, sans-serif;

/* 技術識別子と数値 */
font-family: "JetBrains Mono", ui-monospace, monospace;
```

### Web type scale

| Role | Desktop | Mobile | Weight | Line height | Tracking |
| --- | ---: | ---: | ---: | ---: | ---: |
| Hero | 80px | 42px | 600 | 1.12 | `-0.035em` Latin / `-0.015em` Japanese |
| Display | 48px | 36px | 600 | 1.15 | `-0.015em` |
| H1 | 40px | 32px | 600 | 1.25 | `-0.01em` |
| H2 | 32px | 28px | 600 | 1.30 | `0` |
| H3 | 24px | 22px | 600 | 1.40 | `0` |
| Lead | 20px | 18px | 400 | 1.70 | `0` |
| Body | 16px | 16px | 400 | 1.75 | `0` |
| Small | 14px | 14px | 400 | 1.60 | `0.01em` |
| Label | 13px | 13px | 600 | 1.40 | `0.04em` |

Heroは公式Webサイトの冒頭だけに使う。見出しを巨大化するだけで完成度を作ろうとせず、文字の行長と周囲の余白を同時に設計する。

### Japanese typography

```css
body {
  line-break: strict;
  overflow-wrap: break-word;
  font-kerning: normal;
}

h1, h2, h3, nav {
  font-feature-settings: "palt" 1, "kern" 1;
}
```

- 本文には`palt`を一律適用しない。
- 本文の行長は35〜45字、リードは25〜35字を目安にする。
- 日本語の意味を壊す固定`<br>`を使わない。改行する場合は、文節と画面幅の双方を確認する。
- Heroのように改行が印象を左右する短い見出しは、Desktop、Tablet、320pxで動詞や句読点が孤立しないことを確認し、必要な場合だけ意味単位の行を指定する。
- 英字大文字のアイブロウ、等幅ラベル、技術識別子は、内容上必要な場合だけ使う。雰囲気づくりのために乱用しない。

## 6. Layout Principles

### Grid and measure

- Max content width: `1280px`
- Desktop grid: 12 columns / gutter `24–32px`
- Tablet: 8 columns
- Mobile: 4 columns / horizontal padding `20px`
- Main reading measure: `640–720px`
- Section spacing: `96–144px` Desktop / `72–96px` Mobile

### Editorial rhythm

- 同じ大きさ、同じ背景、同じ構造のカードを3つ以上並べることを基本形にしない。
- 大きな主張、短い説明、番号、引用、プロセスを異なる幅で組み、視線の速度を変える。
- 箱で囲う前に、余白、位置、文字サイズ、背景差で関係を示す。
- 罫線は情報の開始、順序、状態を示す場合に使い、画面全体を方眼紙にしない。
- 1画面に一つの明確な焦点を置く。オレンジCTA、巨大見出し、図形を同じ強さで競わせない。

## 7. Components

### Header

- Deep canvas、正式リバースロゴ、必要最小限のナビゲーション。
- 高さ`72–80px`。常時固定する場合も過度なぼかしや半透明ガラス表現を使わない。
- Mobileはロゴと主要CTAを残し、補助ナビをメニューへ移す。
- 320px幅でもロゴ、メニュー、主要CTAが折返しや欠落を起こさず、表示中の操作領域を`44 × 44px`以上にする。

### Primary CTA

- Orange background / Charcoal text / radius `4px`
- Minimum height `48px`、minimum touch target `44 × 44px`
- Hoverは小さな位置変化または内側罫線を併用し、色だけに依存しない。
- 文言は「現場の課題を相談する」のように行動を具体化する。

### Secondary action and text link

- ダーク面ではWhite文字 + 明確な下線を基本とする。
- 枠付きボタンは主要CTAと競合しない場面だけに使う。

### Information modules

- 常設のカード外観を作らず、見出し、説明、番号、細い区切り線で構成する。
- 背景面を変える場合は、ページ内で1〜2段階に限定する。
- タグ型UIは実際の分類、状態、フィルタ以外へ使わない。

## 8. Depth, Motion, and Interaction

- 基本の影は`none`。奥行きは暗色面の差と余白で作る。
- オレンジのずらし影、発光、ガラス、3D、斜めのグラデーションをブランド表現として使わない。
- Transition: `160–240ms`, `ease-out`。
- 装飾的な常時アニメーションを使わない。
- `prefers-reduced-motion: reduce`で移動と平滑スクロールを解除する。
- Focus on dark: Orangeの3pxリング。背景との間に1px以上のDeep canvasの間隔を確保する。

## 9. Photography and Graphic Direction

- 掲載許可済みの現場写真を、1枚ずつ大きく扱う。小さなストック写真をカードへ並べない。
- 人、手元、会話、確認、試行錯誤を主役にする。
- 写真がない段階では、意味のないAI画像や技術的な模様で空白を埋めない。
- 背景シンボルは名刺と同じく低コントラストで使えるが、ロゴと競合させない。
- 技術の証拠は、コード風装飾ではなく、公開できる成果物、プロセス、図、実測値として見せる。

## 10. Responsive Behavior

| Breakpoint | Width | Behavior |
| --- | ---: | --- |
| Mobile | `< 600px` | 1列、20px余白、42px Hero、主要CTA全幅 |
| Tablet | `600–959px` | 8列、見出しと本文を必要に応じて分離 |
| Desktop | `>= 960px` | 12列、非対称構成を使用可能 |

- 横スクロールを発生させない。
- Hoverでのみ得られる情報を作らない。
- ナビゲーション、CTA、リンクのタッチ領域を44px以上にする。
- Desktopの意図的な非対称性を、Mobileで無理に維持しない。

## 11. Do and Don't

### Do

- 正式なリバースロゴを広い余白の中で使う。
- Dark canvas、White text、Orange actionの階層を明確にする。
- 日本語の行長、改行、行間を実画面で確認する。
- 余白とタイポグラフィを、罫線やカードより先に使う。
- 人と実際の仕事を主語にする。
- Desktop、Tablet、Mobileのスクリーンショットを並べて判断する。

### Don't

- ワードマークをフォントで打ち直す。
- 方眼、回路、端末、ネオン、発光で技術力を表現する。
- オレンジの帯、影、巨大図形を複数競わせる。
- 3枚の同型カードだけでサービスを説明する。
- 全セクションを交互背景と箱で機械的に分割する。
- 等幅フォントや英字大文字ラベルを装飾として多用する。
- 許可のない現場写真、顧客情報、実績に見えるAI画像を使う。

## 12. Review Checklist

1. 暗いだけでなく、温かさと相談しやすさがあるか。
2. 正式なリバースロゴを使い、ワードマークを再構成していないか。
3. 1画面に一つの主役があり、オレンジが支配していないか。
4. 視覚階層をカードと罫線だけに依存していないか。
5. 日本語の行長、行間、禁則、改行が適切か。
6. 技術的な装飾を使わず、実際の行動と価値が伝わるか。
7. 44pxタッチ領域、フォーカス、コントラスト、reduced motionを守っているか。
8. 写真、事例、数値が事実以上の印象を与えていないか。

## References

- https://github.com/VoltAgent/awesome-design-md
- https://github.com/kzhrknt/awesome-design-md-jp

参照したDESIGN.mdの分析値は比較材料であり、PinkieTechのトークンや視覚表現として直接採用しない。
