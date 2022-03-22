module.exports = {
  getEpoch: () => {
    const msEpoch = new Date().getTime();
    const epoch = parseInt(msEpoch / 1000);
    return epoch
  }
}