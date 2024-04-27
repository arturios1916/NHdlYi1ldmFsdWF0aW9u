import { calculateRelativeDate, relativeDateValues } from './relative-date';
import { expect } from '@open-wc/testing';

describe('Calculate Relative Date', () => {
  it('Today', () => {
    const input  = new Date();
    const expected = relativeDateValues.TODAY;
    const actual = calculateRelativeDate(input);
    expect(actual).to.equal(expected);
  });
});
