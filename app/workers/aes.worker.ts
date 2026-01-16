import CryptoJS from "crypto-js";

interface AesMessage {
  type: "encrypt" | "decrypt";
  payload: {
    text: string;
    key: string;
  };
}

self.onmessage = (event: MessageEvent<AesMessage>) => {
  const { type, payload } = event.data;
  const { text, key } = payload;

  try {
    if (!text || !key) {
      self.postMessage({ type: "success", value: "" });
      return;
    }

    let result = "";

    if (type === "encrypt") {
      result = CryptoJS.AES.encrypt(text, key).toString();
    } else {
      const bytes = CryptoJS.AES.decrypt(text, key);
      result = bytes.toString(CryptoJS.enc.Utf8);

      if (!result) throw new Error("Malformed UTF-8 data");
    }

    self.postMessage({ type: "success", value: result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    self.postMessage({
      type: "error",
      error: msg,
    });
  }
};
