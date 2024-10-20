import { createMapPage } from '../src/bundles/presenters/MapPage/createMapPage';

describe('Check render for map-page', () => {
  it('is correct render', () => {
    const map = createMapPage();
    expect(map).toBeInstanceOf(HTMLElement);
    expect(map.outerHTML).toBe(
      '<main class=" main"><section class=" map"><div class=" container"><h2 class=" title map__title">Карта банкоматов</h2><div class=" map__container"></div></div></section></main>',
    );
  });
});
