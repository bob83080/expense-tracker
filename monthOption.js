// function monthOption(d) {
//   console.log(typeof (d))
//   let yr = d.getFullYear()
//   let mn = d.getMonth() + 1
//   if (mn < 10) {
//     mn = '0' + mn
//   }

//   //將日期拼成設計稿上的格式
//   return (yr + '年' + mn + '月')
// }

function monthOption(d, months) {
  let yr = d.getFullYear()
  let mn = d.getMonth() + 1
  if (mn < 10) {
    mn = '0' + mn
  }
  month = yr + '年' + mn + '月'
  months.push(month)
  months = Array.from(new Set(months))
  return (months)
}


module.exports = monthOption