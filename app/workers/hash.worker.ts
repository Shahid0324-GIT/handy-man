import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import { HashAlgorithm } from "@/utils";

interface WorkerMessage {
  type: "hash_text";
  payload: {
    text: string;
    algo: HashAlgorithm;
    cost?: number;
  };
}

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { type, payload } = event.data;

  if (type === "hash_text") {
    const { text, algo, cost = 10 } = payload;
    let result = "";

    try {
      if (!text) {
        self.postMessage({ type: "success", value: "" });
        return;
      }

      switch (algo) {
        case "MD5":
          result = CryptoJS.MD5(text).toString();
          break;
        case "SHA1":
          result = CryptoJS.SHA1(text).toString();
          break;
        case "SHA256":
          result = CryptoJS.SHA256(text).toString();
          break;
        case "SHA512":
          result = CryptoJS.SHA512(text).toString();
          break;
        case "BCRYPT":
          result = await bcrypt.hash(text, cost);
          break;
      }

      self.postMessage({ type: "success", value: result });
    } catch (error) {
      self.postMessage({ type: "error", error: (error as Error).message });
    }
  }
};
