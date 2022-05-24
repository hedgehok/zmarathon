export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className)
        $tag.classList.add(className);
    return $tag;
}

const formatValue = (value) => (value < 10) ? '0' + value : value;
export function getTime() {
    const d = new Date();
    return `${formatValue(d.getHours())}:${formatValue(d.getMinutes())}:${formatValue(d.getSeconds())}`;
}

export const getRandom = (roof) => Math.ceil(Math.random() * roof);
