export function parseDate(date, form) {
  if (!date || !form) {
    return '';
  }
  const options = {
    year: 'numeric',
    month: form,
    day: 'numeric',
  };

  const newDate = new Date(date).toLocaleDateString('ru-RU', options);

  if (form === 'long') {
    newDate.slice(0, -2);
  }
  return newDate;
}
