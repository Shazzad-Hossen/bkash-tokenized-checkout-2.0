const Transaction = require("./Transaction");
const Agreement = require("./agreement");
const Payment = require("./payment");
const axios = require("axios");

class Base {
  SANDBOX = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
  LIVE = "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout";

  constructor(username, password, appKey, appSecret, isDev) {
    this.username = username;
    this.password = password;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.BASE_URL = isDev ? this.SANDBOX : this.LIVE;
  }

  async init() {
    return new Promise((resolve) => {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: this.username,
        password: this.password,
      };
      const body = {
        app_key: this.appKey,
        app_secret: this.appSecret,
      };
      this.fetch(`/token/grant`, body).then((res) => {
        this.token_type = res.token_type;
        this.refresh_token = res.refresh_token;
        this.id_token = res.id_token;
        this.agreement = new Agreement(this);
        this.payment = new Payment(this);
        this.transaction = new Transaction(this);

        resolve(this);
      });
    });
  }

  async fetch(endPoint, body) {
    const headers= endPoint.endsWith('grant') || endPoint.endsWith('refresh')? {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: this.username,
        password: this.password,
      } : {
        Authorization: this.id_token,
        "Content-Type": "application/json",
        "X-App-Key": this.appKey,
      }

    const response = await axios.post(`${this.BASE_URL+endPoint}`, body, {headers});
    return response.data;
  }
}

module.exports = Base;
