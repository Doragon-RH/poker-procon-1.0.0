# Flush Code Hack ルールブック <!-- omit in toc -->

## 変更履歴

| 日付       | 対象箇所         | 変更内容                       |
| ---------- | ---------------- | ------------------------------ |
| 2024/05/08 | 全体             | 新規作成                       |
| 2024/05/20 | ゲームからの退場 | タイムアウトに関する記載を削除 |
| 2024/05/20 | 再試合           | 章を新設                       |

## 目次

- [変更履歴](#変更履歴)
- [目次](#目次)
- [用語解説集](#用語解説集)
- [カードの強さとスートの順位](#カードの強さとスートの順位)
- [ポーカーの役 (強さ順)](#ポーカーの役-強さ順)
- [ゲームルール](#ゲームルール)
- [ゲームからの退場](#ゲームからの退場)
- [再試合](#再試合)

## 用語解説集

- **プレイヤー**: ゲームに参加している個人。このゲームでは 4 人のプレイヤーが参加します。
- **ディーラー**: カードを配る役割を持つ専門の人物で、プレイヤー 4 人とは別に存在します。
- **ポイント**: プレイヤーがゲーム開始時に持つ仮想のスコア。初期値は 20,000 ポイントです。
- **ラウンド**: ゲーム内で行われる一連のプレイのサイクル。各プレイヤーがカードを受け取り、ベットを行い、最終的に勝者が決まるまでのプロセスです。
- **フェーズ**: 1 ラウンド内の行動やプロセスの区切り。ベット、ドロー、カードの公開など、ゲーム進行の各段階を指し、プレイヤーは各フェーズに従い特定のアクションを取ります。
- **山札**: ラウンド開始時に、未使用のカードを保持しているデッキ。ディーラーが各プレイヤーにカードを配る際や、プレイヤーがドローを行う際にここからカードが引かれます。ラウンド中、山札が足りなくなった時点で、ディーラーはドローによってプレイヤーから捨てられたカードをシャッフルして新たな山札を作ります。このゲームでは、トランプのカードの A, 2〜10, J, Q, K を使用し、ジョーカーは含まれません。
- **手札**: プレイヤーが現在持っているカードのセット。これらのカードを使用してゲームの各ラウンドでプレイし、勝敗を決めます。
- **ドロー**: 手札の不要なカードを捨て、捨てたカードと同じ枚数のカードを山札から引いてくる行動。1 回のドローで 0 枚から 5 枚までのカードを交換できます。
- **ベット**: プレイヤーがゲーム内でポイントを出して行う賭けのこと。
- **コール**: 前のプレイヤーがベットしたポイント数と同じポイントをベットする行動。
- **レイズ**: 前のプレイヤーがベットしたポイントよりも多くのポイント（1 ポイント以上）をベットする行動。各ラウンドでプレイヤーは何度でもレイズが可能です。
- **チェック**: 何も賭けずに次のプレイヤーに番を渡す行動。ベットが行われていない状態でのみ可能です。
- **ドロップ**: そのラウンドから降りる行動。ドロップしたプレイヤーはそのラウンドの勝敗に影響を及ぼさず、ベットしたポイントを放棄します。
- **オール・イン**: 自身が所持する全ポイントをベットするアクション。オール・インしたプレイヤーは、そのラウンドでは以降ドロップすることはできません。
- **ポット**: プレイヤーが支払った参加フィーやベットしたポイントが集まる共通のプールのことです。ラウンドの勝者がそのポットの中身を獲得します。

## カードの強さとスートの順位

- カードの強さの順序は、A（最も強い）、K、Q、J、10、9、8、7、6、5、4、3、2（最も弱い）の順になります。
- カードのスートの強さは、スペード（♠）> ハート（♥）> ダイアモンド（♦）> クラブ（♣）の順になります。
- 役が同じ場合、カードの数字の強さで勝敗を決定します。それでも同じ場合は、スートの強さによって勝敗を判定します。

## ポーカーの役 (強さ順)

1. **ロイヤルストレートフラッシュ**: 同じスートの A, K, Q, J, 10
1. **ストレートフラッシュ**: 連続する数字のカード 5 枚が同じスート
1. **フォーカード**: 同じ数字のカード 4 枚
1. **フルハウス**: 3 枚の同じ数字と別の 2 枚の同じ数字のカード
1. **フラッシュ**: すべてのカードが同じスート（数字はバラバラでもよい）
1. **ストレート**: 連続する 5 枚の数字のカード（スートはバラバラでもよい）
1. **スリーカード**: 同じ数字のカード 3 枚
1. **ツーペア**: 2 組の同じ数字のペア
1. **ワンペア**: 1 組の同じ数字のペア
1. **ハイカード**: 上記のいずれの役にも当てはまらない場合、最も高いカードが役になります。カードの数字によって勝敗が決まり、同じ数字の場合はスートの強さで勝敗を判定します。

## ゲームルール

1. **ゲームの開始**:
   - 4 プレイヤーでゲームを開始し、各プレイヤーの持ち点は 20,000 ポイントからスタートします。
   - ゲームの最初に席順と一番最初のプレイヤーがランダムに決定されます。
1. **ラウンドの進行**:
   - 各プレイヤーは参加フィー 200 ポイントをポットに入れます。支払い不能なプレイヤーはゲームから退場します。
   - ディーラーが山札をシャッフルし、各プレイヤーに 5 枚ずつカードを配ります。
   - **１回目のベットフェーズ**: 一番最初のプレイヤーから順に、ベット、チェック、コール、レイズ、オール・イン、ドロップのいずれかを選択してポイントをベットします。誰かがレイズしてから 1 周する間に、他のプレイヤーがレイズしなければ、ベットフェーズは終わります。
   - **１回目のドローフェーズ**: プレイヤーは不要なカードを 0 枚から 5 枚まで交換できます。
   - **２回目のベットフェーズ**: 再度、ベット、チェック、コール、レイズ、オール・イン、ドロップを行います。
   - **２回目のドローフェーズ**: プレイヤーは再び不要なカードを交換できます。
   - **勝負フェーズ**: プレイヤー全員の手札を公開し、1 番強い役を持つプレイヤーが勝ち、ポットの中身を全て受け取ります。オール・インをしたプレイヤーも、そのラウンドで勝利した場合、ポットの中身を全て受け取ります。
   - 一番最初のプレイヤーは時計回りに順番を交代します。
1. **ゲームの終了**:
   - 100 ラウンドが終了するか、残りプレイヤーが 1 人になるまでゲームは続けられます。最終的にポイントが最も多いプレイヤーが勝者となります。

## ゲームからの退場

- 参加フィー 200 ポイントが支払い不能となったプレイヤーはゲームから退場します。
- ゲームからプレイヤーが退場した場合、そのプレイヤーが所有するポイントは 0 になり、残りのプレイヤーでそのままゲームを続行します。

## 再試合

- 試合中にプレイヤープログラムにより、プロセスが停止した場合は原因となるプレイヤープログラムを除外し再試合を行います。
- 除外されたプレイヤープログラムは、再度試合に参加することはできません。
