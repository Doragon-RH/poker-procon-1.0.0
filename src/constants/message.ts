import type { ErrorCode } from '@/schema/common';

export const SUCCESS_MESSAGES = {
  createGame: '新しいゲームを作成しました。',
  startGame: 'ゲームを開始しました。',
};

export const ERROR_MESSAGES: { [key in ErrorCode]: string } = {
  BA001: '存在しないAPIです。',

  BB001: '必須項目です。',
  BB002: '数値で入力してください。',
  BB003: '整数で入力してください。',
  BB004: '参加者を4人選択してください。',
  BB005: '1以上の値を入れてください。',
  BB006: '1,000以上の値を入れてください。',
  BB007: '1,000以下の値を入れてください。',
  BB008: '10,000以下の値を入れてください。',
  BB009: '1,000,000以下の値を入れてください。',

  BC001: 'ディレクトリの作成に失敗しました。',
  BC002: 'ディレクトリの読み込みに失敗しました。',
  BC003: 'ファイルの書き込みに失敗しました。',
  BC004: 'ファイルの読み込みに失敗しました。',

  BD001: 'ゲームが見つかりませんでした。',

  BZ001: '予期しないエラーが発生しました。',
};
