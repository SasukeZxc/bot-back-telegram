

const token ='6263755551:AAGG3wZaJ9VizTSW4XTshsc4NBAnlOFNdgw'

const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(token, {polling:true})

const formURL = "https://bot-front-babidgon.vercel.app/"
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg)=>{
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text == '/start'){
        await bot.sendMessage(chatId, "Ниже появится кнопка, отдай долг Родине", {
            reply_markup:{
                inline_keyboard:[
                    [{text:'Отдай долг Родине', web_app:{url:formURL + '/form'}} ]
                ]
            }
        })
        
    await bot.sendMessage(chatId, 'Заходи в наш интернет магазин', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Сделать заказ', web_app: {url: formURL}}]
            ]
        }
    })
    }
 
    if (msg?.web_app_data?.data){
        try{
            const data = JSON.parse(msg?.web_app_data?.data)
            bot.sendMessage(chatId, 'Спасибо за обратную связь!')
            bot.sendMessage(chatId, 'Ваш город:'+ data?.city)
            bot.sendMessage(chatId, 'Ваша улица:'+ data?.street)
            setTimeout(async() => {
                await bot.sendMessage(chatId,'Информация в этом чате')
            }, 3000);
        } catch(e){
            console.log(e)
        }
    }

    
    if (text.toLowerCase() == 'привет')
    bot.sendMessage(chatId, "Привет");

    else if (text.toLowerCase() == 'пока'){
        bot.sendMessage(chatId, "Пока!");
        bot.stopPolling();
    }

    else if (text.toLowerCase() == 'расскажи анекдот')
        bot.sendPhoto(chatId, "mem.png");

    else if (text.toLowerCase() == 'покажи мемасик')
        bot.sendPhoto(chatId, 'memasik.png')

    else
        bot.sendMessage(chatId, 'Я не понимать');
 
})
 
 
app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму
                ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000;
app.listen(PORT, () => console.log('server started on PORT ' + PORT))
 
 
 
 
 
 
 
  


/*

    else if (text.toLowerCase() == 'пока'){
        bot.sendMessage(chatId, "Пока!");
        bot.stopPolling();
    }

    else if (text.toLowerCase() == 'расскажи анекдот')
        bot.sendPhoto(chatId, "mem.png");

    else
        bot.sendMessage(chatId, 'Я не понимать');
*/