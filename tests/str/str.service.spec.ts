import { describe, expect, it } from "vitest";
import {
  convertStringCase,
  extractText,
  normalizeText,
  padText,
  removeAccents,
  replaceText,
  slugifyText,
  transformBase64,
  transformHtmlEntities,
  transformUrlEncoding,
  trimText,
  truncateText,
  getLevenshteinDistance
} from "../../src/services/str/index.js";

describe("str service", () => {
  it("should give me the distance between two strings", () => {
    expect(getLevenshteinDistance("kitten", "sitting")).toBe(3);
  });

  it("should give me the distance between two strings", () => {
    expect(getLevenshteinDistance("book", "back")).toBe(2);
  });

  it("should give me the distance between two strings", () => {
    expect(getLevenshteinDistance("cat", "cut")).toBe(1);
  });

  it("should give me the distance between two strings", () => {
    expect(getLevenshteinDistance("", "")).toBe(0);
  });

  it("should give me the distance between two strings", () => {
    expect(getLevenshteinDistance("Hello".toLowerCase(), "hello")).toBe(0);
  });

  it("should give me the distance between two strings", () => {
    expect(getLevenshteinDistance("João", "Joao")).toBe(1);
  });

  it("should slugify text", () => {
    expect(slugifyText("Hello Cool World")).toBe("hello-cool-world");
  });

  it("should convert text between case styles", () => {
    expect(convertStringCase("my cool variable", "camel")).toBe(
      "myCoolVariable"
    );
    expect(convertStringCase("my cool variable", "constant")).toBe(
      "MY_COOL_VARIABLE"
    );
  });

  it("should trim and truncate text", () => {
    expect(trimText("  hello world  \n")).toBe("hello world");
    expect(truncateText("hello world", { max: 8, suffix: "..." })).toBe(
      "hello..."
    );
  });

  it("should replace text using literal and regex modes", () => {
    expect(replaceText("hello world", { from: "world", with: "brutils" })).toBe(
      "hello brutils"
    );
    expect(
      replaceText("hello 123 and 456", { from: "\\d+", with: "X", regex: true })
    ).toBe("hello X and X");
  });

  it("should normalize and remove accents", () => {
    expect(normalizeText("Café")).toBe("Café");
    expect(removeAccents("résumé")).toBe("resume");
  });

  it("should pad text", () => {
    expect(padText("42", { length: 5, side: "left" })).toBe("   42");
    expect(padText("42", { length: 5, side: "both" })).toBe(" 42  ");
  });

  it("should extract content by regex and delimiters", () => {
    expect(extractText("[one] [two]", "\\[(.*?)\\]", { regex: true })).toEqual([
      "one",
      "two"
    ]);
    expect(
      extractText("Hello <a>world</a> and <a>team</a>", "<a>|</a>")
    ).toEqual(["world", "team"]);
  });

  it("should encode and decode base64, url and html", () => {
    const encodedBase64 = transformBase64("hello world", "encode");
    expect(transformBase64(encodedBase64, "decode")).toBe("hello world");

    const encodedUrl = transformUrlEncoding("hello world", "encode");
    expect(transformUrlEncoding(encodedUrl, "decode")).toBe("hello world");

    const encodedHtml = transformHtmlEntities("<strong>ok</strong>", "encode");
    expect(encodedHtml).toBe("&lt;strong&gt;ok&lt;/strong&gt;");
    expect(transformHtmlEntities(encodedHtml, "decode")).toBe(
      "<strong>ok</strong>"
    );
  });
});
