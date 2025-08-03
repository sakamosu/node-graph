/**
 * 浮動小数点数の精度を統一するためのユーティリティ関数
 * SSR/クライアント間の数値精度の違いを解決する
 */

/**
 * 数値を指定した小数点以下の桁数で丸める
 * @param num 丸める数値
 * @param decimals 小数点以下の桁数（デフォルト: 6）
 * @returns 丸められた数値
 */
export const roundToFixed = (num: number, decimals: number = 6): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}

/**
 * SVGパス用の座標値を統一精度で丸める
 * @param coordinates 座標値の配列
 * @param decimals 小数点以下の桁数（デフォルト: 6）
 * @returns 丸められた座標値の配列
 */
export const roundCoordinates = (coordinates: number[], decimals: number = 6): number[] => {
  return coordinates.map(coord => roundToFixed(coord, decimals))
}