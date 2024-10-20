import { createSelectFrame } from '../src/bundles/components/selectFrame';

describe('Check select Frame', () => {
  const arr = [
    '2222400070000005',
    '5555341244441115',
    '5577000055770004',
    '5555444433331111',
    '2222410740360010',
  ];

  it('is correct render with full list', () => {
    const frame = createSelectFrame(arr);
    const oneElem =
      '<li class=" select-list__item"><button class=" select-list__btn" id="0">2222400070000005</button></li>';
    expect(frame).toBeInstanceOf(HTMLDivElement);
    expect(frame.outerHTML.includes(oneElem)).toBeTruthy();
    expect(frame.outerHTML.includes('frame')).toBeTruthy();
  });

  it('is correct render with empty list', () => {
    const frame2 = createSelectFrame([]);
    expect(frame2).toBeInstanceOf(HTMLDivElement);
    expect(frame2.outerHTML.includes('</li>')).toBeFalsy();
    expect(frame2.outerHTML.includes('<button>')).toBeFalsy();
  });
});
