import type { LicenceRecord } from "../types";

/**
 * Ambiguous characters are left out so a student reading a number off a printout
 * cannot confuse O with 0 or I with 1.
 */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomChars(count: number, random: () => number): string {
  let out = "";
  for (let i = 0; i < count; i += 1) {
    out += ALPHABET[Math.floor(random() * ALPHABET.length)];
  }
  return out;
}

/** Local calendar date as YYYY-MM-DD, without dragging in a date library or UTC surprises. */
export function isoLocalDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Builds a licence record from randomness only. Nothing about the student, the device,
 * or their answers feeds into the number: two students who finish at the same second
 * still get unrelated numbers, and the number cannot be traced back to anyone.
 */
export function createLicenceRecord(now: Date = new Date(), random: () => number = Math.random): LicenceRecord {
  return {
    number: `ALL-${randomChars(4, random)}-${randomChars(4, random)}`,
    issuedOn: isoLocalDate(now),
  };
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-09-04" -> "4 September 2026". Falls back to the raw string if it is not a date. */
export function formatIssueDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const name = MONTHS[Number(month) - 1];
  if (!name) return iso;
  return `${Number(day)} ${name} ${year}`;
}
