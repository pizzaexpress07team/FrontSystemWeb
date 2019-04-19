/**
 * 解析菜单列表
 * @param itemList
 */
export const parseMenu = (itemList) => {
  const menuObj = {};
  const menuNameList = [];
  itemList.forEach((item) => {
    if (!Object.prototype.hasOwnProperty.call(itemList, item)) {
      if (menuObj[item.p_type]) {
        menuObj[item.p_type].push(item);
      } else {
        menuObj[item.p_type] = [];
        menuObj[item.p_type].push(item);
        menuNameList.push(item.p_type);
      }
    }
  });
  return { menuObj, menuNameList };
};

/**
 * 解析时间戳
 * @param nowTimestamp
 * @returns {string} 2019-04-15 22:22:22
 */
export const timeTrans = (nowTimestamp) => {
  const date = new Date(nowTimestamp * 1000); // 如果date为13位不需要乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
  const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
  const m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
  const s = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
  return Y + M + D + h + m + s;
};

/**
 * 解析支付状态
 * @param payState
 * @returns {string}
 */
export const parsePayState = payState => (payState === 0 ? '未支付' : '已支付');

/**
 * 解析配送状态
 * @param payState
 * @returns {string}
 */
export const parseDeliveryState = (deliveryState) => {
  if (deliveryState === 0) {
    return '未配送';
    // eslint-disable-next-line
  } else if (deliveryState === 1) {
    return '配送中';
  } else {
    return '已送达';
  }
};
