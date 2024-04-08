const debounce = (fn: any, ms: number) => {
  // Задержка запроса на 500 мс при вводе данных пользователем
  let timeout: number;
  return function () {
      const fnCall = function() {
          fn.apply(this);
      };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
  };
};

export {debounce};