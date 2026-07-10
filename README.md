# PinkieTech Website

PinkieTech株式会社の公式Webサイトです。

> 現場の力を、技術で引き出す。

技術を前面に出すのではなく、仕事をする人、課題を理解する姿勢、小さな改善の積み重ねを中心に構成しています。

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

## Contact

- Email: [contact@pinkie-tech.jp](mailto:contact@pinkie-tech.jp)
- X: [@pinkietech](https://x.com/pinkietech)
- GitHub: [w-pinkietech](https://github.com/w-pinkietech)

## License

[MIT License](LICENSE)
