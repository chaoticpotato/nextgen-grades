import { p1123 } from "./persons/p1123";
import { p1223 } from "./persons/p1223";
import { p0124 } from "./persons/p0124";
import { p0224 } from "./persons/p0224";
import { fe0424 } from "./persons/fe0424";
import { frontend2024 } from "./persons/frontend2024";


export const cohortIds = {
  1123: 17,
  1223: 21,
  "java_11+12": 29,
  "java_01+02": 37,
  "0124": 24,
  "0224": 26,
  "0324-0424": 33,
  "0424-FE": 44,
  "0524": 36,
  "0624": 38,
  "0724": 43,
  p0424: 32,
  "0824": 46,
  "frontend2024": null
};

export const javaCohorts = [29, 37];
export const javaCohortNames = ["java_11+12", "java_01+02", "0424-FE", "frontend2024"];

export const persons = {
  "java_11+12": [...p1123, ...p1223],
  "java_01+02": [...p0124, ...p0224],
  "0424-FE": fe0424,
  "frontend2024": frontend2024
};
