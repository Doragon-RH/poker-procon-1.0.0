import JsPlayer from "./demo-player-js"; // 変更禁止
import TsPlayer from "./demo-player-ts"; // 変更禁止
// ↓作成したプレイヤープログラムをimportしてください。
import ta from "./team1"; // sample
// ↑作成したプレイヤープログラムをimportしてください。

const Players: {
  [key: string]: any;
} = {
  DemoPlayer1: TsPlayer, // 変更禁止
  DemoPlayer2: TsPlayer, // 変更禁止
  DemoPlayer3: TsPlayer, // 変更禁止
  DemoPlayer4: JsPlayer, // 変更禁止
  team1: ta,
  // ↓作成したプレイヤープログラムを定義してください。
  // Team1, // sample
  // ↑作成したプレイヤープログラムを定義してください。
};

export default Players;
