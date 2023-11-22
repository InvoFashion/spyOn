const OpenAI = require("openai");
require('dotenv').config();



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
const openFun=async(input)=>{
  const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-0613",
      messages: [{"role": "user", "content": `what is computer`,}],
      max_tokens:100
    });
    //console.log(chatCompletion.choices[0].message.content);
    return chatCompletion.choices[0].message.content;
}
  
module.exports = openFun();


