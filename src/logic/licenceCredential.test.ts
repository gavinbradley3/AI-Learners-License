import { describe, expect, it } from "vitest";
import { createLicenceRecord, formatIssueDate, isoLocalDate } from "./licenceCredential";

describe("createLicenceRecord", () => {
  it("issues a number in the printed format with no ambiguous characters", () => {
    for (let i = 0; i < 500; i += 1) {
      const { number } = createLicenceRecord();
      expect(number).toMatch(/^ALL-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
      expect(number).not.toMatch(/[OI01]/);
    }
  });

  it("derives nothing from the student — the same instant still gives unrelated numbers", () => {
    const instant = new Date("2026-09-04T10:00:00");
    const numbers = new Set(Array.from({ length: 200 }, () => createLicenceRecord(instant).number));
    // Collisions are possible in principle; a shared seed would collapse this to 1.
    expect(numbers.size).toBeGreaterThan(150);
  });

  it("stamps the device's local calendar date, not a UTC one", () => {
    // Late evening local time is already the next day in UTC; the licence must say today.
    const lateEvening = new Date(2026, 8, 4, 23, 30, 0);
    expect(createLicenceRecord(lateEvening).issuedOn).toBe("2026-09-04");
    expect(isoLocalDate(lateEvening)).toBe("2026-09-04");
  });
});

describe("formatIssueDate", () => {
  it("reads as a date a student would write", () => {
    expect(formatIssueDate("2026-09-04")).toBe("4 September 2026");
    expect(formatIssueDate("2026-01-15")).toBe("15 January 2026");
  });

  it("passes anything that is not a date straight through", () => {
    expect(formatIssueDate("")).toBe("");
    expect(formatIssueDate("not-a-date")).toBe("not-a-date");
    expect(formatIssueDate("2026-13-01")).toBe("2026-13-01");
  });
});
