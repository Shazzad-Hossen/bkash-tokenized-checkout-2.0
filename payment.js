
class Payment {
  constructor(data) {
    this.data = data;
  }

  async createPayment(body) {
    body.mode='0001'
    const res = await this.data.fetch(`/create`, body);
    return res;
  }

  async executePayment(body) {
    const res = await this.data.fetch(`/execute`, body);
    return res;
  }

  async queryPayment(body) {
    const res = await this.data.fetch(`/payment/status`, body);
    return res;
  }
}
module.exports = Payment;
