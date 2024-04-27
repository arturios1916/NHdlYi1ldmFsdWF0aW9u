import { calculateRelativeDate, relativeDateValues } from './relative-date';
import { expect } from '@open-wc/testing';

describe('Calculate Relative Date', () => {
  it('Today', () => {
    const input  = new Date();
    const expected = relativeDateValues.TODAY;
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
  it('Yesterday', () => {
    const input  = new Date().setDate(new Date().getDate() - 1);
    const expected = relativeDateValues.YESTERDAY;
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
  it('Day before yesterday', () => {
    const input  = new Date().setDate(new Date().getDate() - 2);
    const expected = relativeDateValues.THIS_WEEK;
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
  it('7 days before today', () => {
    const input  = new Date().setDate(new Date().getDate() - 7);
    const expected = relativeDateValues.THIS_WEEK;
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
  it('8 days before today', () => {
    const input  = new Date().setDate(new Date().getDate() - 8);
    const expected = relativeDateValues.LAST_WEEK;
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
  it('13 days before today', () => {
    const input  =  new Date().setDate(new Date().getDate() - 13);
    const expected = relativeDateValues.LAST_WEEK;
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
 // this month unable to test because of testing framework doens't support system time mocking.
 it('last month', () => {
  const input  = new Date().setMonth(new Date().getMonth() - 1);
  const expected = relativeDateValues.LAST_MONTH;
  const actual = calculateRelativeDate(input);
  expect(actual).to.equal(expected);
});
 // this year unable to test because of testing framework doens't support system time mocking.
 it('last year', () => {
  const currentYear = new Date().getFullYear();
  const input  = new Date().setFullYear(currentYear -  1);
  const expected = relativeDateValues.LAST_YEAR;
  const actual = calculateRelativeDate(input);
  expect(actual).to.equal(expected);
});
 it('Long time ago', () => {
  const currentYear = new Date().getFullYear();
  const input  = new Date().setFullYear(currentYear -  10);
  const expected = relativeDateValues.LONG_TIME_AGO;
  const actual = calculateRelativeDate(input);
  expect(actual).to.equal(expected);
});
});
