function dateFormat(d) {
  //取出日期
  let yr = d.getFullYear()
  let mn = d.getMonth() + 1
  let dd = d.getDate()
  if (mn < 10) {
    mn = '0' + mn
  }
  if (dd < 10) {
    dd = '0' + dd
  }

  //將日期拼成設計稿上的格式
  return (yr + '-' + mn + '-' + dd)
}
module.exports = dateFormat