import { describe, it, expect } from 'vitest';
import { parseDepartureDate, parsePrice } from '@/lib/dateUtils';

describe('dateUtils', () => {
  describe('parseDepartureDate', () => {
    it('should parse April 2026 date correctly', () => {
      const result = parseDepartureDate('1st - 21st April 2026');
      expect(result).toBe('2026-04-01');
    });

    it('should parse October 2026 date correctly', () => {
      const result = parseDepartureDate('1st - 21st October 2026');
      expect(result).toBe('2026-10-01');
    });

    it('should parse November 2026 date correctly', () => {
      const result = parseDepartureDate('1st - 21st November 2026');
      expect(result).toBe('2026-11-01');
    });

    it('should parse December 2026 date correctly', () => {
      const result = parseDepartureDate('1st - 21st December 2026');
      expect(result).toBe('2026-12-01');
    });

    it('should parse January 2027 date correctly', () => {
      const result = parseDepartureDate('7th - 27th January 2027');
      expect(result).toBe('2027-01-07');
    });

    it('should parse 30th January 2027 date correctly', () => {
      const result = parseDepartureDate('30th Jan - 19th Feb 2027');
      expect(result).toBe('2027-01-30');
    });

    it('should parse February 2027 date correctly', () => {
      const result = parseDepartureDate('28th Feb - 20th Mar 2027');
      expect(result).toBe('2027-02-28');
    });

    it('should parse March 2027 date correctly', () => {
      const result = parseDepartureDate('30th Mar - 19th Apr 2027');
      expect(result).toBe('2027-03-30');
    });

    it('should handle abbreviated month names', () => {
      const result = parseDepartureDate('15th Apr - 5th May 2026');
      expect(result).toBe('2026-04-15');
    });

    it('should handle single digit days', () => {
      const result = parseDepartureDate('5th - 15th June 2026');
      expect(result).toBe('2026-06-05');
    });
  });

  describe('parsePrice', () => {
    it('should parse price with pound sign and comma', () => {
      const result = parsePrice('£1,599');
      expect(result).toBe(1599);
    });

    it('should parse price with pound sign only', () => {
      const result = parsePrice('£899');
      expect(result).toBe(899);
    });

    it('should parse price with multiple commas', () => {
      const result = parsePrice('£10,599');
      expect(result).toBe(10599);
    });

    it('should handle price without currency symbol', () => {
      const result = parsePrice('1599');
      expect(result).toBe(1599);
    });
  });
});
