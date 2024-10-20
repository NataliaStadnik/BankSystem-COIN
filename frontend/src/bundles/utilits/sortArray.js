export function sortArray(arr, field) {
  if (field === 'date') {
    return arr.sort((a, b) => {
      const dateFirst = new Date(a.transactions[0]?.date);
      const dateSecond = new Date(b.transactions[0]?.date);

      if (isNaN(dateFirst)) {
        return isNaN(dateSecond) ? 1 : dateSecond;
      } else {
        return isNaN(dateSecond) ? -1 : dateSecond - dateFirst;
      }
    });
  } else {
    return arr.sort((a, b) => b[field] - a[field]);
  }
}
