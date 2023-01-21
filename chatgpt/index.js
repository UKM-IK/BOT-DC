const { Client, Events, GatewayIntentBits } = require ("discord.js")
const { Configuration, OpenAIApi } = require("openai")

require("dotenv").config()
const TokenDC = process.env.BOT_TOKEN
const OPENAI_KEY = process.env.OPENAI_KEY 

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],    
})

client.once(Events.ClientReady, (client) => {
    console.log(`Bot Is Ready, Logged in as ${client.user.tag}`);
})

client.on(Events.MessageCreate, async (msg) =>{
    if (msg.author.bot) {
        return
    }

    if(msg.content.substring(0,1) === "!"){
        const command = msg.content.substring(1).split(" ")[0];

        switch(command){
            case "tanya" :
                msg.channel.send("test")
                break;
            case "ask-IK":
                const response = await AI(`Q:${msg.content.replace("!ask-IK","")}\nA:`)
                msg.channel.send(`${response}`)
        }
    }
})

const AI = async(question) =>{
    const config = new Configuration({
        apiKey : OPENAI_KEY
    })

    const openai = new OpenAIApi(config)

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
      return response.data.choices[0].text
}

client.login(TokenDC)


