
class Transaction {
  constructor(data) {
    this.data = data;
  }

  async searchTransaction(body) {
    const res = await this.data.fetch(`/general/searchTransaction`,body);
    return res;
  }

  async refundTransaction(body) {
    const res = await this.data.fetch(`/payment/refund`,body);
    return res;
  }

  async refundStatus(body) {
    const res = await this.data.fetch(`/payment/refund`,body);
    return res;
  }
}
module.exports = Transaction;
