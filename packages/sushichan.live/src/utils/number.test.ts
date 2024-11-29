import { expect, test } from "vitest";

import { roundToNearestMultiple, zeroPadding } from "./number";

test("zeroPadding with single digit number", () => {
  expect(zeroPadding(5, 3)).toBe("005");
});

test("zeroPadding with double digit number", () => {
  expect(zeroPadding(12, 4)).toBe("0012");
});

test("zeroPadding with larger number than length", () => {
  expect(zeroPadding(12345, 4)).toBe("12345");
});

test("roundToNearestMultiple with positive number", () => {
  expect(roundToNearestMultiple(10, 5)).toBe(10);
});

test("roundToNearestMultiple with negative number", () => {
  expect(roundToNearestMultiple(-10, 5)).toBe(-10);
});

test("roundToNearestMultiple with decimal number", () => {
  expect(roundToNearestMultiple(11, 3)).toBe(12);
});

test("roundToNearestMultiple with decimal number", () => {
  expect(roundToNearestMultiple(7.8, 2)).toBe(8);
});
