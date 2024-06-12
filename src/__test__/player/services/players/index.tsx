import JsPlayer from "./demo-player-js"; // 変更禁止
import TsPlayer from "./demo-player-ts"; // 変更禁止
// ↓作成したプレイヤープログラムをimportしてください。
import test_1 from "./team1"; // sample
import test_2 from "./team2";
import test_3 from "./team3";
import test_5 from "./team5";
import test_7 from "./team7";
import test_8 from "./team8";
// ↑作成したプレイヤープログラムをimportしてください。

const Players: {
  [key: string]: any;
} = {
  DemoPlayer1: TsPlayer, // 変更禁止
  DemoPlayer2: TsPlayer, // 変更禁止
  DemoPlayer3: TsPlayer, // 変更禁止
  DemoPlayer4: JsPlayer, // 変更禁止
  enemy_1: test_7,
  enemy_2: test_7,
  team7_1: test_8,
  team7_2: test_8,
  // ↓作成したプレイヤープログラムを定義してください。
  // Team1, // sample
  // ↑作成したプレイヤープログラムを定義してください。
};

export default Players;
