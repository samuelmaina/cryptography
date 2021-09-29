const { encryptString } = require("./caesar");

describe("Should be able to encrypt", () => {
  it("should be able to set an interval", () => {
    const plain = "a";
    const ciphertext = "d";
    const interval = 3;
    expect(encryptString(plain, interval)).toBe(ciphertext);
  });
  describe("should encyrpt single characters", () => {
    it("lowercase", () => {
      const plain = "a";
      const interval = 3;
      const ciphertext = "d";
      expect(encryptString(plain, interval)).toBe(ciphertext);
    });
    it("uppercase", () => {
      const plain = "A";
      const interval = 7;
      const ciphertext = "H";
      expect(encryptString(plain, interval)).toBe(ciphertext);
    });
    it("characters", () => {
      const plain = "?";
      const interval = 5;
      const ciphertext = "D";
      expect(encryptString(plain, interval)).toBe(ciphertext);
    });
  });

  describe("should encrypt for strings", () => {
    it("for small strings", () => {
      const plain = "JohnDoe34?";
      const interval = 5;
      const ciphertext = "OtmsItj89D";
      expect(encryptString(plain, interval)).toBe(ciphertext);
    });
    it.only("for long strings", () => {
      const plain = "ABC, abc, 123 and @#$#&";
      const interval = 5;
      const ciphertext = "FGH1%fgh1%678%fsi%E()(+";
      expect(encryptString(plain, interval)).toEqual(ciphertext);
    });
  });
});
