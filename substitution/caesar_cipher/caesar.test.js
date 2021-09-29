const { encryptString } = require("./caesar");

describe("Should be able to encrypt", () => {
  it("should be able to set an interval", () => {
    const plain = "a";
    const ciphertext = "d";
    const interval = 3;
    expect(encryptString(plain, interval)).toBe(ciphertext);
  });
  describe("should encyrpt single characters", () => {
    it.only("single small letters", () => {
      const plain = "a";
      const interval = 3;
      const ciphertext = "d";
      expect(encryptString(plain, interval)).toBe(ciphertext);
    });
  });
});
