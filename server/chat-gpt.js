const OpenAI = require("openai");
require('dotenv').config();



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
const openFun=async(input)=>{
  const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [{"role": "user", "content": `${input}`,}],
      max_tokens:100
    });
    //console.log(chatCompletion.choices[0].message.content);
    return chatCompletion.choices[0].message.content;
}
  
module.exports = openFun;


