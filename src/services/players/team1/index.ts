import type winston from "winston";
import { getLogger } from "@/libs/logger";
import { GameInfo, Hand } from "@/schema/game";
import { randomByNumber } from "@/utils/game";
// export const HAND_RANK: { [key in Hand]: string } = {
//   [Hand.Drop]: 'Drop',
//   [Hand.HighCard]: 'High Card',
//   [Hand.OnePair]: 'One Pair',
//   [Hand.TwoPair]: 'Two Pair',
//   [Hand.ThreeOfAKind]: 'Three of a Kind',
//   [Hand.Straight]: 'Straight',
//   [Hand.Flush]: 'Flush',
//   [Hand.FullHouse]: 'Full House',
//   [Hand.FourOfAKind]: 'Four of a Kind',
//   [Hand.StraightFlush]: 'Straight Flush',
//   [Hand.RoyalStraightFlush]: 'Royal Straight Flush',
// };
// //これでいいのか要確認
class TsPlayer {
  private logger: winston.Logger | null | undefined; // player logger

  private id: string; // ゲームID

  private name: string; // プレイヤー名

  private round: number; // ラウンド

  private betUnit: number; // 賭けポイントを追加する単位

  private win: number; // 勝数

  constructor(id: string, name: string) {
    this.logger = getLogger({ group: "player", gameId: id, playerName: name });
    this.id = id;
    this.name = name;
    this.round = 0;
    this.betUnit = 0;
    this.win = 0;

    // 以下、ゲーム参加時の処理
    this.logger?.info(`Start game. ID: ${this.id}`);
  }

  /**
   * 出力するログの共通フォーマット
   * @param text
   * @returns
   */
  private formattedLog(text: string): string {
    return `<Round: ${this.round}>: ${text}`;
  }

  /**
   * ラウンド開始時に行う処理
   * このプログラムではラウンド開始時にレイズ宣言時に追加するポイントを設定する
   * @param data
   * @returns
   */
  private startRound(data: GameInfo): void {
    this.round = data.currentRound;
    this.logger?.info(this.formattedLog("Round start."));

    // 各プレイヤーの情報をログに出力する
    Object.values(data.players).forEach((player) => {
      this.logger?.debug(
        this.formattedLog(
          `Round start. ${player.name} info. status: ${player.status}, point: ${player.point}`
        )
      );
    });
    this.betUnit = randomByNumber(300) + 200; // 1ターンごとに追加するポイント数（このプログラムでは1ターンごとに追加するポイント数を規定しておく。値は200〜500までの間のランダム値）
    this.logger?.debug(this.formattedLog(`bet unit: ${this.betUnit}.`));
  }
  /**
   * 場の最低賭けポイントに対して追加で賭けるポイントを決定する
   * @param data
   * @returns
   */
  private decideBetPoint(data: GameInfo): number {
    this.logger?.info(
      this.formattedLog(
        `Phase ${data.phase}. pot: ${data.pot}, minBetPoint: ${data.minBetPoint}`
      )
    );

    // 各プレイヤーの情報をログに出力する 
    Object.values(data.players).forEach((player) => {
      this.logger?.debug(
        this.formattedLog(
          `${player.name} info. point: ${player.point}, betPoint: ${player.round.betPoint}`
        )
      );
    });

    // ドロップ宣言をするかを決める（このプログラムでは最低賭けポイントが初期ポイントの半分を超えていたらドロップする）
    //if (data.minBetPoint > data.initialPoint / 2) return -1;  ここを変更
    //ドロップ宣言をするかを決める（このプログラムでは最低賭けポイントが初期ポイントの半分を超えていてかつhandrankがnopairの場合ドロップする）
    // const self = data.players[this.name]; // 自身のデータ
    const self_nu = data.players[this.name]; // 自身のデータ
    const cards = self_nu?.round.cards ?? [];
    const changeCards = this.getChangeCards(cards);
    if (
      changeCards[0] == false &&
      changeCards[1] == false &&
      changeCards[2] == false &&
      changeCards[3] == false &&
      changeCards[4] == false
    ) {
      if (Math.random() < 0.95) {
        return -1;
      }
    }
    //ここにフォール度条件の追加を記述すべし
    const self = data.players[this.name]; // 自身のデータ
    const diff = data.minBetPoint - (self?.round.betPoint ?? 0); // 現在の最低賭けポイントと既に賭けたポイントとの差額
    this.logger?.info(
      this.formattedLog(
        `my cards: ${JSON.stringify(self?.round.cards)}, diff: ${diff}`
      )
    );
    const point = self?.point ?? 0; // 所持ポイント
    const stack = point - diff; // 自由に使用できるポイント
    const canRaise = stack > 0; // 自由に使用できるポイントが1以上あればレイズが宣言できる
    // //追記ゾーン
    // const canbet =  stack > 0; // 自由に使用できるポイントが1以上あればベットが宣言できる
    // if (canbet) {
    //   // ベットが宣言できる場合
    //   if (data.phase === "bet-1") {
    //     // 1回目のベットフェーズ
    //     // このプログラムでは1回目のベットフェーズで、誰も賭けていなければベットを行う
    //     //if (!data.minBetPoint) return this.betUnit;
    //     if (canbet) {
    //       if (this.name.HAND_RANK === 'High Card') {
    //           return -1;
    //       } else if (this.name.HAND_RANK === 'One Pair') {
    //           return this.betUnit;
    //       } else if (this.name.HAND_RANK === 'Two Pair') {
    //           return this.betUnit * 2;
    //       } else {
    //           return this.betUnit * 3;
    //       }
    //   }

    //   } else if (data.phase === "bet-2") {
    //     // 2回目のベットフェーズ
    //     // このプログラムでは2回目のベットフェーズで、初期ポイントの1/10以上の値が賭けられていなければレイズを宣言する
    //     //if (data.minBetPoint < data.initialPoint / 10) return this.betUnit; // stackがbetUnit賭けポイントを追加する単位より大きければレイズ、小さければオール・インとなる（このプログラムではレイズを宣言する時betPoint分のポイントを追加する）
    //     if (canbet) {
    //       if (this.name.HAND_RANK === 'High Card') {
    //           return -1;
    //       } else if (this.name.HAND_RANK === 'One Pair') {
    //           return this.betUnit;
    //       } else if (this.name.HAND_RANK === 'Two Pair') {
    //           return this.betUnit * 2;
    //       } else {
    //           return this.betUnit * 3;
    //       }
    //   }
    // }
    // //元からある部分
    if (canRaise) {
      // レイズが宣言できる場合
      if (data.phase === "bet-1") {
        // 1回目のベットフェーズ
        // このプログラムでは1回目のベットフェーズで、誰も賭けていなければベットを行う
        if (!data.minBetPoint) return this.betUnit;
      } else if (data.phase === "bet-2") {
        // 2回目のベットフェーズ
        // このプログラムでは2回目のベットフェーズで、初期ポイントの1/10以上の値が賭けられていなければレイズを宣言する
        if (data.minBetPoint < data.initialPoint / 10) return this.betUnit; // stackがbetUnit賭けポイントを追加する単位より大きければレイズ、小さければオール・インとなる（このプログラムではレイズを宣言する時betPoint分のポイントを追加する）
      }
    }

    // レイズが宣言できない時 チェック/コール or オール・イン
    const declareAllIn = randomByNumber(1000) < 1; // オール・インを宣言するか（このプログラムでは1/1000の確率でオール・インを宣言する）
    return declareAllIn ? stack : 0; // オール・インまたはコール
  }
      
  /**
   * 交換する手札を選択する
   * @param data
   * @returns
   */
  private drawCard(data: GameInfo): boolean[] {
    const self = data.players[this.name]; // 自身のデータ
    const cards = self?.round.cards ?? [];
    // let isHold: boolean = false; // 明示的な型指定

    this.logger?.info(
      this.formattedLog(
        `phase: ${data.phase}. my cards: ${JSON.stringify(cards)}`
      )
    );
    const changeCards = this.getChangeCards(cards);

    // 交換するカードのインデックスを取得
    const changeIndexes = cards
      .map((card, index) => (changeCards.includes(card) ? index : -1))
      .filter((index) => index !== -1);

    // 交換するカードの位置をtrue、それ以外をfalseに設定
    return cards.map((_, index) => changeIndexes.includes(index));
  }

  private getChangeCards(cards) {
    let isHold = false;

    // 同じ数字があればホールド
    let beforeCard = null;
    for (let card of cards) {
      if (card.isHold) continue;

      if (beforeCard != null && card.number == beforeCard.number) {
        card.isHold = true;
        beforeCard.isHold = true;
        isHold = true;
      }
      beforeCard = card;
    }

    // 同じスートが4つ以上あればホールド
    if (!isHold) {
      let suit = null;
      const suitCount = {};
      for (let card of cards) {
        if (suitCount[card.suit] == null) suitCount[card.suit] = 0;
        suitCount[card.suit]++;
        if (suitCount[card.suit] >= 4) suit = card.suit;
      }
      if (suit != null) {
        for (let card of cards) {
          if (card.suit == suit) card.isHold = true;
        }
        isHold = true;
      }
    }

    // 連番が4つ以上あればホールド
    if (!isHold) {
      for (let i = 0; i < 2; i++) {
        if (
          cards[i].number + 1 == cards[i + 1].number &&
          cards[i].number + 2 == cards[i + 2].number &&
          cards[i].number + 3 == cards[i + 3].number
        ) {
          cards[i].isHold = true;
          cards[i + 1].isHold = true;
          cards[i + 2].isHold = true;
          cards[i + 3].isHold = true;
        }
      }
      isHold = true;
    }

    // ホールドしなかったカードが交換対象
    const changeCards = [];
    for (let card of cards) {
      if (!card.isHold) changeCards.push(card);
    }
    for (let card of cards) {
      card.isHold = false;
    }
    return changeCards;
  }

  /**
   * ラウンド終了時に行う処理
   * @param data
   * @returns
   */
  private endRound(data: GameInfo): void {
    this.logger?.info(
      this.formattedLog(
        `${data.currentRound}>: Round end. winner: ${data.winner}`
      )
    );

    // 各プレイヤーの情報をログに出力する
    Object.values(data.players).forEach((player) => {
      this.logger?.debug(
        `<Round: ${data.currentRound}>: Round end. ${
          player.name
        } info. status: ${player.status}, point: ${
          player.point
        }}, cards: ${JSON.stringify(player.round.cards)}, hand: ${
          player.round.hand
        }`
      );
    });

    if (data.winner === this.name) {
      this.win += 1;
      this.logger?.debug(this.formattedLog(`Win count: ${this.win}`));
    }
  }

  /** ***************************************************************
   * ラウンド開始時の処理
   * ※startRound内を変更し、基本的にこの関数は変更しないでください。
   *
   * @param data
   * @returns
   * ***************************************************************
   */
  public start(data: GameInfo): void {
    this.startRound(data);
  }

  /** ***************************************************************
   * ベットフェーズの処理
   * ※decideBetPoint内を変更し、基本的にこの関数は変更しないでください。
   * 返却値の値によって、宣言するコールが変わります。
   * x = 追加で賭けるポイント
   *
   * x = 0: チェック/コール（賭けポイントを追加しません / コールの場合それまでの賭けポイントの差額は支払います）
   * x > 0 and x <= 所持ポイント: レイズ（場の最低賭けポイントに更にポイントを追加します）
   * x < x: ドロップ（本ラウンドで賭けたポイントを放棄し、本ラウンドを棄権します）
   * x > 所持ポイント: オール・イン
   *
   * @param data
   * @returns
   * ***************************************************************
   */
  public bet(data: GameInfo): number {
    return this.decideBetPoint(data);
  }

  /** ***************************************************************
   * 交換フェーズの処理
   * ※drawCard内を変更し、基本的にこの関数は変更しないでください。
   *
   * 交換するカードの意思表示をbooleanの配列で行います。
   * true: 交換する
   * false: 交換しない、
   *
   * ex.)
   * 手札: []
   * 2枚目と5枚目を交換する場合は [false, true, false, false, true] というデータを返却します。
   *
   * @param data
   * @returns
   * ***************************************************************
   */
  public draw(data: GameInfo): boolean[] {
    return this.drawCard(data);
  }

  /** ***************************************************************
   * ラウンド終了時の処理
   * ※endRound内を変更し、基本的にこの関数は変更しないでください。
   *
   * @param data
   * @returns
   * ***************************************************************
   */
  public end(data: GameInfo): void {
    this.endRound(data);
  }

  /** ***************************************************************
   * テスト確認用の関数
   * ***************************************************************
   */
  public test(): {
    id: string;
    name: string;
    round: number;
    betUnit: number;
    win: number;
  } {
    return {
      id: this.id,
      name: this.name,
      round: this.round,
      betUnit: this.betUnit,
      win: this.win,
    };
  }
}

export default TsPlayer;
