import React from "react";
import readabilityScores from "readability-scores";
import unlerp from "unlerp";
import lerp from "lerp";
import median from "compute-median";
import unified from "unified";
import english from "retext-english";
import stringify from "retext-stringify";

export default function all(node: any, parentIds: any): any {
  const children = node.children;
  const length = children.length;
  let results: any = [];

  for (let index = 0; index < length; index++) {
    results = results.concat(one(children[index], parentIds.concat(index)));
  }

  return results;
}

function one(node: any, parentIds: any): any {
  const nodeValue = "value" in node ? node.value : all(node, parentIds);
  if (node.type === "SentenceNode") {
    return <span style={computeHighlightStyle(node)}>{nodeValue}</span>;
  }
  return nodeValue;
}

function gradeToAge(grade: number) {
  return getAge(Math.round(grade + 5));
}

function getAge(value: number) {
  const max = 22;
  return value > max ? max : value;
}

function getAverage(results: any) {
  return median([
    gradeToAge(results.daleChall),
    gradeToAge(results.ari),
    gradeToAge(results.colemanLiau),
    gradeToAge(results.fleschKincaid),
    gradeToAge(results.smog),
    gradeToAge(results.gunningFog),
  ]);
}

function computeHighlightStyle(node: any, age = 12, scale = 6) {
  const text = unified().use(english).use(stringify).stringify(node);
  const results = readabilityScores(text);
  const average = getAverage(results);
  const weight = unlerp(age, age + scale, average);
  const hue = lerp(120, 0, Math.min(1, Math.max(0, weight)));

  return {
    backgroundColor: "hsla(" + [hue, "93%", "70%", 0.5].join(", ") + ")",
  };
}
