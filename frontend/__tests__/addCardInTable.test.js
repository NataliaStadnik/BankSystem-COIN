import { addCardInTable } from '../src/bundles/utilits/cardValidation';

describe('Check correct class name for card image', () => {
  it('return correct class name if card is valid', () => {
    expect(addCardInTable(4486441729154030)).toBe(`body__img--visa`);
    expect(addCardInTable(5529263272356119)).toBe(`body__img--mastercard`);
    expect(addCardInTable(375700000000002)).toBe(`body__img--american-express`);
  });

  it('return empty string if card number is not valid', () => {
    expect(addCardInTable(1012342321232)).toBeFalsy();
    expect(addCardInTable(111111111111)).toBeFalsy();
    expect(addCardInTable()).toBeFalsy();
  });
});
