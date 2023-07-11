class Agreement {
  constructor(data) {
    this.data = data;
  }

  async createAgreement(body) {
    body.mode = "0000";
    const res = await this.data.fetch(`/create`, body);
    return res;
  }

  async executeAgreement(body) {
    const res = await this.data.fetch(`/execute`, body);
    return res;
  }

  async queryAgreement(body) {
    const res = await this.data.fetch(`/agreement/status`, body);
    return res;
  }

  async cancelAgreement(body) {
    const res = await this.data.fetch(`/agreement/cancel`, body);
    return res;
  }
}
module.exports = Agreement;
