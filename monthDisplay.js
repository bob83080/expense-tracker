function monthDisplay(d) {
  //取出日期
  let yr = d.getFullYear()
  let mn = d.getMonth() + 1
  if (mn < 10) {
    mn = '0' + mn
  }

  //將日期拼成設計稿上的格式
  return (yr + '年' + mn + '月')

}
module.exports = monthDisplay