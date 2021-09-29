const { encryptString, decryptString } = require("./caesar");

describe("Should be able to encrypt", () => {
  describe("should throw when provided with the wrong params", () => {
    describe("string", () => {
      it("invalid", () => {
        expect(() => {
          encryptString(12, 12);
        }).toThrow(
          "Must be supplied with a string as text to encrypt and a numeric interval."
        );
      });

      it("empty", () => {
        expect(() => {
          encryptString("", 12);
        }).toThrow(
          "Must be supplied with a string as text to encrypt and a numeric interval."
        );
      });
    });

    describe("interval", () => {
      it("invalid", () => {
        expect(() => {
          encryptString(12, [1]);
        }).toThrow(
          "Must be supplied with a string as text to encrypt and a numeric interval."
        );
      });

      it("less than 1", () => {
        expect(() => {
          encryptString("string", 0);
        }).toThrow(
          "Must be supplied with a string as text to encrypt and a numeric interval."
        );
      });
    });
  });
  it("should be able to set an interval", () => {
    const plain = "a";
    const ciphertext = "d";
    const interval = 3;
    expect(encryptString(plain, interval)).toBe(ciphertext);
  });

  it("should not overflow", () => {
    //the last character in our implementation is the charCode 126;
    const the126thAsciiChar = "~";
    const ciphertext = "$";
    const interval = 5;
    expect(encryptString(the126thAsciiChar, interval)).toBe(ciphertext);
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
    it("special characters", () => {
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
    it("for long strings", () => {
      const plain = " A string with ABC, abc, 123 and @#$#&";
      const interval = 5;
      const ciphertext = "%F%xywnsl%|nym%FGH1%fgh1%678%fsi%E()(+";
      expect(encryptString(plain, interval)).toEqual(ciphertext);
    });
  });
});

describe("shoud be able to decrypt", () => {
  it("should through if one of the params is wrong", () => {
    expect(() => {
      decryptString("", 1);
    }).toThrow(
      "Must be supplied with a string as text to encrypt and a numeric interval."
    );
  });
  it("for single characters", () => {
    const plain = "a";
    const ciphertext = "d";
    const interval = 3;
    expect(decryptString(ciphertext, interval)).toBe(plain);
  });

  describe("Does not overflow", () => {
    it("upper bound", () => {
      const plain = "~";
      const ciphertext = "$";
      const interval = 5;
      expect(decryptString(ciphertext, interval)).toBe(plain);
    });
    it("lower bound", () => {
      const plain = " ";
      const ciphertext = "%";
      const interval = 5;
      expect(decryptString(ciphertext, interval)).toBe(plain);
    });
  });

  it("should decrypt for long strings", () => {
    const plain = "ABC,abc, 123 and #$#?";
    const ciphertext = "HIJ3hij3'89:'huk'*+*F";
    const interval = 7;
    expect(decryptString(ciphertext, interval)).toBe(plain);
  });
});
