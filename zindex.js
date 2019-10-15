const YYYYMMDDstring = (dateTime) => {
  const date = new Date(dateTime);
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${month <= 9 ? '0'+month : month}-${date.getDate() <= 9 ? '0'+date.getDate() : date.getDate()}`
}

console.log(YYYYMMDDstring(1570809600000))