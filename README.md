# PinkieTech Website

PinkieTech株式会社の公式Webサイトです。

> 現場の力を、技術で引き出す。

技術を前面に出すのではなく、仕事をする人、課題を理解する姿勢、小さな改善の積み重ねを中心に構成しています。

## Languages

- 日本語: `/`、`/company/`
- English: `/en/`、`/en/company/`

日本語を会社情報とブランド文言の正本とし、英語ページは同じ公開情報の正式な英語表現として管理します。言語は自動転送せず、各ページのヘッダーとフッターから同等ページへ切り替えられます。

法人名は、日本語で`PinkieTech株式会社`、英語で`PinkieTech Co., Ltd.`を使用します。ロゴや見出しなどのブランド表記は`PinkieTech`です。

各ページには固有の`lang`、title、description、canonical、Open Graph metadataと、相互参照する`hreflang`を設定します。

## Brand direction

- People first — 技術より人を先に考える
- Field oriented — 物理的な場所に限らず、実際に仕事が行われる「現場」から始める
- Practical — 大きな構想だけでなく、使える小さな一歩をつくる
- Open — OSSを尊重し、知識を共有可能な形で残す
- Approachable — 難しい言葉を避け、相談しやすいプロフェッショナルである

ブランドの正式な基準は非公開の `w-pinkietech/pinkietech-brand` リポジトリで管理します。
このリポジトリでは、実装に必要なWebデザイン基準を [`DESIGN.md`](DESIGN.md) に同期しています。
公開会社情報はブランド管理リポジトリの正本から [`COMPANY.md`](COMPANY.md) へ同期し、`/company/`で表示します。

外部の `awesome-design-md` / `awesome-design-md-jp` は調査資料として参照し、PinkieTech固有の意味・ロゴ・配色・文章を優先して再構成しています。

## Development

Node.js 20以上が必要です。

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run lint
npm run design:check
npm run build
npm audit
```

## Search and AI access

- `public/sitemap.xml` — 日本語・英語ページと対応関係
- `public/robots.txt` — 検索・利用者起点のAIアクセスと、学習用クロールを分ける方針
- `public/llms.txt` — AIエージェント向けの補助的なサイト案内
- JSON-LD — 会社の正式名称、設立日、所在地、連絡先、公式アカウント

`llms.txt`は提案段階の補助形式として扱い、通常のHTML、構造化データ、サイトマップ、明確なURLを機械可読性の中心にします。公開情報に存在しない実績、認証、提携、数値を構造化データやAI向け文書へ追加しません。

OpenAIについては、検索表示用の`OAI-SearchBot`を許可し、学習用の`GPTBot`は別方針として拒否します。詳細は[OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)を参照してください。

## Contact

- Email: [contact@pinkie-tech.jp](mailto:contact@pinkie-tech.jp)
- X: [@pinkietech](https://x.com/pinkietech)
- GitHub: [w-pinkietech](https://github.com/w-pinkietech)

## License

[MIT License](LICENSE)
