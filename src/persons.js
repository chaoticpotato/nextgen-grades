import { p1123 } from "./persons/p1123";
import { p1223 } from "./persons/p1223";
import { p0124 } from "./persons/p0124";
import { p0224 } from "./persons/p0224";
import { p0324 } from "./persons/p0324";
import { p0424 } from "./persons/p0424";
import { p0524 } from "./persons/p0524";

export const cohortIds = {
  1123: 17,
  1223: 21,
  "java_11+12": 29,
  "java_01+02": 37,
  "0124": 24,
  "0224": 26,
  "0324": 31,
  "0424": 33,
  "0524": 36,
};

export const javaCohorts = [29, 37];

export const persons = {
  1123: p1123,
  1223: p1223,
  "java_11+12": [...p1123, ...p1223],
  "0124": p0124,
  "0224": p0224,
  "java_01+02": [...p0124, ...p0224],
  "0324": p0324,
  "0424": p0424,
  "0524": p0524,
};
