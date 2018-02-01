const timeSince = function returnHumanFriendlyStringOfHowLongSinceDate(date) {
  // Inspired by https://stackoverflow.com/a/3177838/7950458
  const secondsPer = [
    { name: 'year', value: 60 * 60 * 24 * 365 },
    { name: 'month', value: 60 * 60 * 24 * 30 },
    { name: 'week', value: 60 * 60 * 24 * 7 },
    { name: 'day', value: 60 * 60 * 24 },
    { name: 'hour', value: 60 * 60 },
    { name: 'minute', value: 60 },
    { name: 'second', value: 1 },
    { name: 'millisecond', value: 1e-3 },
    { name: 'microseconds', value: 1e-6 },
    { name: 'nanosecond', value: 1e-9 }
  ];

  const seconds = Math.floor((new Date() - date) / 1000);
  let interval;
  for (let unit of secondsPer) {
    interval = Math.floor(seconds / unit.value);
    if (interval > 1) {
      return `${interval} ${unit.name}s ago`;
    }
  }
  return 'Just now';
};
