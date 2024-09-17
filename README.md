# orion-discord-notifier

Orion Discord Notifier は、Orion Terminal の通知を Discord に転送する Chrome 拡張機能です。

## 機能

- Orion Terminal のウェブページで発生する通知を捕捉します。
- 捕捉した通知を指定された Discord Webhook URL に転送します。
- 特定の通貨ペアに関する通知を除外する機能があります。

## インストール方法

1. このリポジトリをクローンまたはダウンロードします。
2. Chrome ブラウザで `chrome://extensions` を開きます。
3. 右上の「デベロッパーモード」を有効にします。
4. 「パッケージ化されていない拡張機能を読み込む」をクリックします。
5. ダウンロードしたフォルダを選択します。

## 使用方法

1. Chrome ツールバーの拡張機能アイコンをクリックして、Orion Discord Notifier の設定を開きます。
2. Discord Webhook URL を入力します。
3. 除外したい通貨ペアをカンマ区切りで入力します（例：BTC/USDT,ETH/USDT）。
4. 「Active」チェックボックスにチェックを入れます。
5. 「Save」ボタンをクリックして設定を保存します。

## 注意事項

- この拡張機能は https://orionterminal.com/* のURLでのみ動作します。

## 開発者向け情報

- `manifest.json`: 拡張機能の設定ファイル
- `popup.html` / `popup.js`: 設定用のポップアップUIとその制御スクリプト
- `content.js`: ウェブページに注入されるスクリプト
- `injected.js`: `Notification` APIをフックするスクリプト
- `background.js`: バックグラウンドで動作し、通知の処理とDiscordへの送信を行うスクリプト

## ライセンス

[MITライセンス](LICENSE)

## 免責事項

この拡張機能は、Orion Terminal の公式製品ではありません。使用は自己責任で行ってください。
