const DICTIONARY = [
  "ad",
  "adipisicing",
  "aliqua",
  "aliquip",
  "amet",
  "anim",
  "aute",
  "cillum",
  "commodo",
  "consectetur",
  "consequat",
  "culpa",
  "cupidatat",
  "deserunt",
  "do",
  "dolor",
  "dolore",
  "duis",
  "ea",
  "eiusmod",
  "elit",
  "enim",
  "esse",
  "est",
  "et",
  "eu",
  "ex",
  "excepteur",
  "exercitation",
  "fugiat",
  "id",
  "in",
  "incididunt",
  "ipsum",
  "irure",
  "labore",
  "laboris",
  "laborum",
  "lorem",
  "magna",
  "minim",
  "mollit",
  "nisi",
  "non",
  "nostrud",
  "nulla",
  "occaecat",
  "officia",
  "pariatur",
  "proident",
  "qui",
  "quis",
  "reprehenderit",
  "sed",
  "sint",
  "sit",
  "sunt",
  "tempor",
  "ullamco",
  "ut",
  "velit",
  "veniam",
  "voluptate",
];

export type LoremUnit = "paragraphs" | "sentences" | "words";

export function generateLorem(
  count: number,
  unit: LoremUnit,
  startWithLorem: boolean
): string {
  if (unit === "words") {
    let words = generateWords(count);
    if (startWithLorem) {
      words = ["Lorem", "ipsum", "dolor", "sit", "amet", ...words.slice(5)];
    }
    return words.join(" ");
  }

  if (unit === "sentences") {
    const sentences = [];
    for (let i = 0; i < count; i++) {
      sentences.push(generateSentence());
    }
    if (startWithLorem && sentences.length > 0) {
      sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    }
    return sentences.join(" ");
  }

  // Paragraphs
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 3) + 4;
    const sentences = [];
    for (let j = 0; j < sentenceCount; j++) {
      sentences.push(generateSentence());
    }
    paragraphs.push(sentences.join(" "));
  }

  if (startWithLorem && paragraphs.length > 0) {
    paragraphs[0] =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
      paragraphs[0].substring(paragraphs[0].indexOf(".") + 1);
  }

  return paragraphs.join("\n\n");
}

function generateWords(count: number): string[] {
  return Array.from(
    { length: count },
    () => DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)]
  );
}

function generateSentence(): string {
  const wordCount = Math.floor(Math.random() * 10) + 8;
  const words = generateWords(wordCount);

  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  return words.join(" ") + ".";
}
