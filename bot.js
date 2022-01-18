const Mastodon = require("mastodon-api");
const fetch = require("cross-fetch");
const ENV = require("dotenv");
ENV.config();
// Quote Bot Starts
console.log("Quote Bot Starting!!.");
// Mastodon Client
const M = new Mastodon({
  client_key: process.env.CLIENT_KEY,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  timeout_ms: 60 * 1000 * 5,
  api_url: "https://mastodon.social/api/v1/",
});
// Fetch Quote Function
const fetchQuote = async () => {
  const apiURL = "https://api.quotable.io/random";
  const fetchURL = await fetch(apiURL);
  const dataJson = await fetchURL.json();
  const posted = `"${dataJson.content + "\" | " + dataJson.author + "\n\n" + "#quote #motivation #quoteoftheday"}`;
  const params = { status: posted };
  // Mastodon Posts
  M.post("statuses", params, (err) => { err ? console.log(err) : console.log("Posted Successfully!!.") });
};
// Call fetchQuote Function Every 4.5 Minutes
setInterval(fetchQuote, 60000 * 4.5);
