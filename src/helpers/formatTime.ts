const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  const formattedDate = date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false,
  });
  return formattedDate;
};

export { formatTime };
