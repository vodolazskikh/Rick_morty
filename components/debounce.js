const debounce = (fn, ms) => {
    // Задержка запроса на 500 мс при вводе данных пользователем
    let timeout;
    return function () {
        const fnCall = () => {
            fn.apply(this, arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
    };
};
export {debounce};