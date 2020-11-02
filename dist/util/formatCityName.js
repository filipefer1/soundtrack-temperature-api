"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAccents = void 0;
const accentsMap = {
  a: "á|à|ã|â|À|Á|Ã|Â",
  e: "é|è|ê|É|È|Ê",
  i: "í|ì|î|Í|Ì|Î",
  o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
  u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
  c: "ç|Ç",
  n: "ñ|Ñ"
};

const removeAccents = text => Object.keys(accentsMap).reduce((acc, cur) => acc.replace(new RegExp(accentsMap[cur], "g"), cur), text);

exports.removeAccents = removeAccents;