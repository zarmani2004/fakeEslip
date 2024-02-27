const express = require('express');
const { getTime, getDate } = require('./utils/dateTime');
const app = express()

const PORT = 3000;

app.listen(PORT, () => console.log(`Local server running on port ${PORT}...`))

// Register view engine and middleware
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static('dist'));
app.use(express.static('src'));

let data = {
    sign: '+',
    amount: 0,
    type: '',
    name: '',
    phone: '',
    note: ''
}

let language = 'english'

app.get("/", (req, res) => {
    const maskNumber = '*'.repeat(7) + data.phone.substring(7);
    // Format the amount value
    let formattedAmount = data.amount.toString(); // Convert amount to a string
    formattedAmount = formattedAmount.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Remove non-numeric characters
    formattedAmount = formattedAmount + '.00'; // Append .00 at the end

    const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
    const transactionNumber = '01003226060' + randomDigits;

    
    const contentArray = [
        {
            prop: language == 'english' ? 'Transaction Time' : 'လုပ်ဆောင်သော အချိန်',
            value: `${getDate()} ${getTime()}`
        },
        {
            prop: language == 'english' ? 'Transaction No.' : 'လုပ်ဆောင်မှုအမှတ်',
            value: transactionNumber
        },
        {
            prop: language == 'english' ? 'Transcation Type' : 'လုပ်ဆောင်မှုအမျိုးအစား',
            value: language == 'english' ? data.type : 'ငွေလွှဲ'
        },
        {
            prop: language == 'english' ? (data.sign == '+' ? 'Transfer From' : 'Transfer To') : (data.sign == '+' ? 'ပေးပို့သူ' : 'ငွေလွှဲမည် သို့'),
            // data.sign == '+' ? 'Transfer From' : 'Transfer To'
            value: `${data.name} (${maskNumber})`
        },
        {
            prop: language == 'english' ? 'Amount' : 'ငွေပမာဏ',
            value: `${data.sign}${formattedAmount} Ks`
        },
        {
            prop: language == 'english' ? 'Notes' : 'မှတ်ချက်',
            value: data.note
        }
    ]
    res.render("index", {data, contentArray, language})
})

app.get("/create", (req, res) => {
    res.render("create")
})

app.post("/create", (req, res) => {
    const sign = req.body.sign
    const amount = req.body.amount
    const type = req.body.type
    const name = req.body.name
    const phone = req.body.phone
    const note = req.body.note
    const lang = req.body.language

    data = {
        sign,
        amount,
        type,
        name,
        phone,
        note
    }
    language = lang;


    res.redirect("/")
})