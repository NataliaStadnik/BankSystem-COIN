import { createPagination } from '../src/bundles/components/pagination';

describe('Check pagination', () => {
  const pagination = createPagination(1, 3);

  it('is correct create button', () => {
    expect(pagination).toBeInstanceOf(HTMLDivElement);
  });

  it('if buttons amount < 6', () => {
    expect(pagination.outerHTML.includes('3')).toBeTruthy();
    expect(pagination.outerHTML.includes('4')).toBeFalsy();
    expect(pagination.outerHTML.includes('pagination__dots')).toBeFalsy();
  });

  it('if buttons amount >= 6', () => {
    const paginations = createPagination(5, 6);
    expect(paginations.outerHTML.includes('5')).toBeTruthy();
    expect(paginations.outerHTML.includes('12')).toBeFalsy();
    expect(paginations.outerHTML.includes('pagination__dots')).toBeTruthy();
  });

  it('if buttons amount negative', () => {
    const paginations = createPagination(5, -5);
    const expectedHTML =
      '<div class=" pagination"><button class=" btn-reset pagination__arrow">0</button><button class=" btn-reset pagination__arrow">0</button></div>';
    expect(paginations.outerHTML).toBe(expectedHTML);
  });
});
