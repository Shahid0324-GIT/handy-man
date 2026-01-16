self.onmessage = (event: MessageEvent<string>) => {
  const text = event.data;

  try {
    if (!text || text.trim() === "") {
      self.postMessage({ type: "success", value: "" });
      return;
    }

    // Heavy computation happens here
    const parsed = JSON.parse(text);
    const formatted = JSON.stringify(parsed, null, 2);

    self.postMessage({ type: "success", value: formatted });
  } catch (error) {
    self.postMessage({
      type: "error",
      error: (error as Error).message,
    });
  }
};
