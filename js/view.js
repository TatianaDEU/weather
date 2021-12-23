export const UI = {
    INPUT: document.querySelector('.input1'),
    FORM: document.querySelector('.weather'),
    LIST: document.querySelectorAll('.tabs__item'),
    LIKE: document.querySelector('.img_heart'),
    WEATHER_ICON: document.querySelector('.img_heart'),
    currentCity: document.querySelector('.descr__text'),
    locations: document.querySelector('.locations'),
    deleteBtn: document.querySelector('button.delete'),
    TEMP: document.querySelector('.content__left-temp'),
}

export function tabsHandler() {
    UI.LIST.forEach(item => {
        item.addEventListener('click', () => {
            UI.LIST.forEach(el => {
                el.classList.remove('active');
            });
            item.classList.add('active');
        });
    });
}