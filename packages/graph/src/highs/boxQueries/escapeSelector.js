// From https://stackoverflow.com/a/19702783/1179377
// Also see:
// - https://mathiasbynens.be/notes/css-escapes
// - https://github.com/mathiasbynens/cssesc/issues/21
export default selector =>
  selector
    .replace(/\\/g, '\\\\')
    .replace(/([ #;&,.+*~\':"@!^$[\]()<=>|\/\{\}\?])/g, '\\$1'); // eslint-disable-line no-useless-escape
