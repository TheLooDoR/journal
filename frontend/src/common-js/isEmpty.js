export default function isEmpty (object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}