
function iconColor(category) {
  const iconsColor = {
    '家居物業': 'background-color: rgb(235, 178, 178);',
    '交通出行': 'background-color: rgb(154, 211, 179);',
    '休閒娛樂': 'background-color: rgb(255, 255, 173);',
    '餐飲食品': 'background-color: rgb(178, 235, 235);',
    '其他': 'background-color: rgb(255, 215, 246);'
  }

  return iconsColor[category]
}

module.exports = iconColor