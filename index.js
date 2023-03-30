const { Client } = require("revolt.js");
const keepAlive = require(`./server`);
const axios = require('axios');
const { ChannelType } = require('revolt.js/dist/maps/Channels');
let client = new Client();

const quotes = [
  "I'm not superstitious, but I am a little stitious. - The Office",
  "How you doin'? - Friends",
  "Winter is coming. - Game of Thrones",
  "Resistance is futile. - Star Trek",
  "Live long and prosper. - Star Trek",
  "Bazinga! - The Big Bang Theory",
  "Hodor. - Game of Thrones",
  "We were on a break! - Friends",
  "What's up, doc? - Looney Tunes",
  "Cowabunga! - Teenage Mutant Ninja Turtles"
];




client.on("message", async (message) => {
    if (message.content === "!help") {
        message.channel.sendMessage("Heres the commands  : ```!roll ,!ping , !chuck , !quote , !insult , !fact , !dadjoke , !trivia , !cat , !dog , !catfact , !fact``` ");
    }
});

client.on('message', async message => {
  if (message.content === '!roll') {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    await message.channel.sendMessage(`You rolled a ${randomNumber}! 🎲`);
  }
});

client.on('message', async (message) => {
  if (message.content === '!ping') {
    const pingMessage = await message.channel.sendMessage('Pinging...');
    const latency = pingMessage.timestamp - message.timestamp;
    message.channel.sendMessage(`Pong! Latency is ${latency}ms.`);
  }
});

const fetch = require('node-fetch');

client.on('message', async (message) => {
  if (message.content === '!chuck') {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const joke = await response.json();
    message.channel.sendMessage(joke.value);
  }
});

client.on('message', async (message) => {
  if (message.content === '!quote') {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    message.channel.sendMessage(randomQuote);
  }
});

const fetchs = require('node-fetch');

client.on('message', async (message) => {
  if (message.content === '!insult') {
    const response = await fetchs('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    const data = await response.json();
    message.channel.sendMessage(data.insult);
  }
});

const fet = require('node-fetch');

client.on('message', async (message) => {
  if (message.content === '!fact') {
    const response = await fet('http://numbersapi.com/random/trivia');
    const data = await response.text();
    message.channel.sendMessage(data);
  }
});

const fetc = require('node-fetch');

client.on('message', async (message) => {
  if (message.content === '!dadjoke') {
    const response = await fetc('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    message.channel.sendMessage(data.joke);
  }
});

const fetch1 = require('node-fetch');

client.on('message', async (message) => {
  if (message.content === '!trivia') {
    const response = await fetch1('https://opentdb.com/api.php?amount=1&type=multiple');
    const data = await response.json();
    const question = data.results[0].question;
    const answers = data.results[0].incorrect_answers;
    const correctAnswer = data.results[0].correct_answer;
    answers.push(correctAnswer);
    answers.sort(() => Math.random() - 0.5);
    const options = answers.map((answer) => `\`${answer}\``).join(', ');
    const triviaMessage = `${question}\n\n${options}`;
    message.channel.sendMessage(triviaMessage);
  }
});

const fetch2 = require('node-fetch');

client.on('message', async (message) => {
  if (message.content === '!catfact') {
    const response = await fetch2('https://catfact.ninja/fact');
    const data = await response.json();
    message.channel.sendMessage(data.fact);
  }
});


client.on('message', async (message) => {
  if (message.content === '!dog') {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    const imageUrl = response.data.message;
    const messageContent = `🐶 Here's a dog picture!\n${imageUrl}`;
    message.channel.sendMessage({ content: messageContent });
  }
});

client.on('message', async (message) => {
  if (message.content === '!cat') {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search');
    const imageUrl = response.data[0].url;
    const messageContent = `🐱 Here's a cat picture!\n${imageUrl}`;
    message.channel.sendMessage({ content: messageContent });
  }
});

const facts = [
  'A group of flamingos is called a flamboyance.',
  'A cockroach can live several weeks with its head cut off.',
  'A snail can sleep for three years.',
  'The shortest war in history was between Zanzibar and Great Britain in 1896. Zanzibar surrendered after 38 minutes.',
  'The longest time between two twins being born is 87 days.',
  'In Switzerland, it is illegal to own just one guinea pig.',
  'Polar bears could eat as many as 86 penguins in a single sitting if they could find them.',
  'The world’s largest grand piano was built by a 15-year-old in New Zealand.',
  'The world’s largest snowflake on record was 15 inches wide and 8 inches thick. It fell in Montana in 1887.',
  'A crocodile can’t stick its tongue out.',
  'The tallest building in the world, Burj Khalifa, has 163 floors and is located in Dubai.',
  'The longest word in the English language has 189,819 letters and would take over 3 hours to pronounce!',
  'The only letter that doesn’t appear in any U.S. state name is the letter “Q”.'
];

client.on('message', (message) => {
  if (message.content === '!fact') {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    client.sendMessage(message.channel_id, randomFact);
  }
});


client.on("ready", () => {
});

client.loginBot("_xhWbzyDaGStXjWuwvgVPgrAOS3MGeWsc-sHO2U8u3YaBdaCKbTXzUiQM1treN2K");
keepAlive();
