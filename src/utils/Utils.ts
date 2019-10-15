const debounce = (func: Function, wait: number = 1000, immediate: boolean = true) => {
  let timer: NodeJS.Timeout | null;

  return function (...args: any[]) {
    if (immediate && !timer) {
      func.call(null, ...args);
      timer = setTimeout(() => {}, wait);
    }
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.call(null, ...args);
      }, wait)
    }
  }
}

const DateClean = (dateTime: number = Date.now()) => {
  const date = new Date(dateTime);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

const MMDDstring = (dateTime: number) => {
  const date = new Date(dateTime);
  const month = date.getMonth() + 1;
  return `${month <= 9 ? '0'+month : month}-${date.getDate() <= 9 ? '0'+date.getDate() : date.getDate()}`
}

const YYYYMMDDstring = (dateTime: number) => {
  const date = new Date(dateTime);
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${month <= 9 ? '0'+month : month}-${date.getDate() <= 9 ? '0'+date.getDate() : date.getDate()}`
}

export {
  debounce,
  DateClean,
  MMDDstring,
  YYYYMMDDstring
}