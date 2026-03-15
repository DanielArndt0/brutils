import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  compareHash,
  computeChecksum,
  computeHmac,
  computeMd5,
  computeSha1,
  computeSha256,
  computeSha512
} from "../../src/services/hash/index.js";

describe("hash service", () => {
  it("should hash inline text with fixed algorithms", () => {
    expect(computeMd5({ text: "hello" })).toBe(
      "5d41402abc4b2a76b9719d911017c592"
    );
    expect(computeSha1({ text: "hello" })).toBe(
      "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d"
    );
    expect(computeSha256({ text: "hello" })).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
    expect(computeSha512({ text: "hello" })).toMatch(/^[a-f0-9]{128}$/);
  });

  it("should compute HMAC values", () => {
    const expected = crypto
      .createHmac("sha256", "secret")
      .update("hello")
      .digest("hex");

    expect(computeHmac({ algo: "sha256", key: "secret", text: "hello" })).toBe(
      expected
    );
  });

  it("should compute checksums and compare hashes for files", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "brutils-hash-"));
    const filePath = path.join(tempDir, "sample.txt");
    fs.writeFileSync(filePath, "hello", "utf-8");

    const checksum = computeChecksum({ file: filePath, algo: "sha256" });
    expect(checksum).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );

    expect(
      compareHash({ file: filePath, expected: checksum, algo: "sha256" })
    ).toEqual({
      algorithm: "sha256",
      actual: checksum,
      expected: checksum,
      matches: true,
      source: "file"
    });
  });
});
