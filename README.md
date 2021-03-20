# 記帳本
此項目提供記帳資訊，如消費的：名稱、金額、種類、日期...等。
以 Visual Studio Code, Node.js, Express, Handlebars, mongoDB, mongoose, 
heroku, passport, session, middleware, connect-flash, dotenv, bcryptjs 開發。

## 項目功能
* 使用者可以瀏覽所有支出紀錄。
* 使用者可以新增支出紀錄。
* 使用者可以編輯支出紀錄
* 使用者可以刪除支出紀錄
* 點擊左上方"Expense Tracker"可回到首頁。
* 可以只顯示類別或月份的消費。
* 具有使用者身分驗證
* 登出與登入功能

## 專案畫面
![Login page](/public/expense-tracker-login.JPG)
![Home page](/public/expense-tracker-home-new.JPG)
![Create page](/public/expense-tracker-create-new.JPG)

## Installing - 專案安裝流程
1.開啟終端機(Terminal)，Clone 此專案至本機電腦。
```
git clone https://github.com/bob83080/Restaurant-list.git
```
2.CD 進入存放此專案的資料夾
```
cd restaurant-list
```
3.安裝 npm 套件
```
輸入 npm install 指令
```
4.安裝 Express 套件
```
輸入 npm i express指令
```
5.安裝 nodemon 套件
```
輸入 nodemon app.js 指令
```
6. 載入 seed data
```
npm run seed
```
```
npm run dev
```

7.啟動伺服器，執行 app.js 檔案
```
輸入nodemon app.js指令
於任一瀏覽器輸入 http://localhost:3000 
```
8.Heroku
```
輸入nodemon app.js指令
於任一瀏覽器輸入 https://mysterious-falls-31010.herokuapp.com/
```

