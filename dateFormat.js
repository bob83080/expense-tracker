function dateFormat(date) {
  //取出日期
  date = date.toString().slice(4, 15)
  const dateArray = date.split(' ')

  //將月份從英文轉換為數字
  const monthInEng = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let monthInNum = monthInEng.findIndex(month => {
    return month === dateArray[0]
  }) + 1
  monthInNum = monthInNum.toString()

  if (monthInNum.length === 1) {
    dateArray[0] = '0' + monthInNum
  } else {
    dateArray[0] = monthInNum
  }

  //將日期拼成設計稿上的格式
  return `${dateArray[2]}${punctuation}${dateArray[0]}${punctuation}${dateArray[1]}`
}

// function dateFormat(date) {
//   let d = new date()
//   let yyyy = d.getFullYear().toString();
//   let mm = (d.getMonth() + 1).toString();
//   let dd = d.getDate().toString();

//   let mmChars = mm.split('');
//   let ddChars = dd.split('');

//   return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
// }

module.exports = dateFormat