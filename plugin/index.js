let appNavigater;
module.exports = {
  setAppNavigater(navigater) {
    appNavigater = navigater;
  },
  getAppNavigater() {
    return appNavigater;
  },
};