import JsPlayer from "./demo-player-js"; // 変更禁止
import TsPlayer from "./demo-player-ts"; // 変更禁止
// ↓作成したプレイヤープログラムをimportしてください。
import test_1 from "./team1"; // sample
import test_2 from "./team2";
import test_3 from "./team3";
import test_4 from "./team4";
import test_7 from "./team7";
// ↑作成したプレイヤープログラムをimportしてください。

const Players: {
  [key: string]: any;
} = {
  DemoPlayer1: TsPlayer, // 変更禁止
  DemoPlayer2: TsPlayer, // 変更禁止
  DemoPlayer3: TsPlayer, // 変更禁止
  DemoPlayer4: JsPlayer, // 変更禁止
  team7: test_7,
  enemy_1: test_2,
  enemy_2: test_3,
  enemy_3: test_4,
  // ↓作成したプレイヤープログラムを定義してください。
  // Team1, // sample
  // ↑作成したプレイヤープログラムを定義してください。
};

export default Players;
