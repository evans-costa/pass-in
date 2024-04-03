const { customAlphabet } = require("nanoid");

const alphabet: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const generateNanoId = customAlphabet(alphabet, 10);
