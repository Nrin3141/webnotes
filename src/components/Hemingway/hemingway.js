import React from "react";
import { getLyWords, getComplexWords, getQualifyingWords } from "./data";

let data = {
  paragraphs: 0,
  sentences: 0,
  words: 0,
  hardSentences: 0,
  veryHardSentences: 0,
  adverbs: 0,
  passiveVoice: 0,
  complex: 0,
};

export function format(text) {
  data = {
    paragraphs: 0,
    sentences: 0,
    words: 0,
    hardSentences: 0,
    veryHardSentences: 0,
    adverbs: 0,
    passiveVoice: 0,
    complex: 0,
  };
  let paragraphs = text.split("\n");
  paragraphs.map((p) => getDifficultSentences(p));
  data.paragraphs = paragraphs.length;
}

export function counters({ data }) {
  return (
    <div>
      <p>
        You used {data.adverbs} adverb{data.adverbs > 1 ? "s" : ""} Try to use
        {Math.round(data.paragraphs / 3)} or less
      </p>
      <p>
        You have used passive voice {data.passiveVoice} time
        {data.passiveVoice > 1 ? "s" : ""}. Aim for
        {Math.round(data.sentences / 5)} or less.
      </p>
      <p>
        {data.complex} phrase{data.complex > 1 ? "s" : ""} could be simplified.
      </p>
      <p>
        {data.hardSentences} of {data.sentences} sentence
        {data.sentences > 1 ? "s are" : " is"} hard to read
      </p>
      <p>
        {data.veryHardSentences} of {data.sentences} sentence
        {data.sentences > 1 ? "s are" : " is"} very hard to read
      </p>
    </div>
  );
}

export function getDifficultSentences(p) {
  let sentences = getSentenceFromParagraph(p + " ");
  data.sentences += sentences.length;
  let hardOrNot = sentences.map((sent) => {
    let cleanSentence = sent.replace(/[^a-z0-9. ]/gi, "") + ".";
    let words = cleanSentence.split(" ").length;
    let letters = cleanSentence.split(" ").join("").length;
    data.words += words;
    sent = getAdverbs(sent);
    sent = getComplex(sent);
    sent = getPassive(sent);
    sent = getQualifier(sent);
    let level = calculateLevel(letters, words, 1);
    if (words < 14) {
      return sent;
    } else if (level >= 10 && level < 14) {
      data.hardSentences += 1;
      return `<span class="hardSentence">${sent}</span>`;
    } else if (level >= 14) {
      data.veryHardSentences += 1;
      return `<span class="veryHardSentence">${sent}</span>`;
    } else {
      return sent;
    }
  });

  return hardOrNot.join(" ");
}

export function getPassive(sent) {
  let originalWords = sent.split(" ");
  let words = sent
    .replace(/[^a-z0-9. ]/gi, "")
    .toLowerCase()
    .split(" ");
  let ed = words.filter((word) => word.match(/ed$/));
  if (ed.length > 0) {
    ed.forEach((match) => {
      originalWords = checkPrewords(words, originalWords, match);
    });
  }
  return originalWords.join(" ");
}

export function checkPrewords(words, originalWords, match) {
  let preWords = ["is", "are", "was", "were", "be", "been", "being"];
  let index = words.indexOf(match);
  if (preWords.indexOf(words[index - 1]) >= 0) {
    data.passiveVoice += 1;
    originalWords[index - 1] =
      '<span class="passive">' + originalWords[index - 1];
    originalWords[index] = originalWords[index] + "</span>";
    let next = checkPrewords(
      words.slice(index + 1),
      originalWords.slice(index + 1),
      match
    );
    return [...originalWords.slice(0, index + 1), ...next];
  } else {
    return originalWords;
  }
}

export function getSentenceFromParagraph(p) {
  let sentences = p
    .split(". ")
    .filter((s) => s.length > 0)
    .map((s) => s + ".");
  return sentences;
}

export function calculateLevel(letters, words, sentences) {
  if (words === 0 || sentences === 0) {
    return 0;
  }
  let level = Math.round(
    4.71 * (letters / words) + (0.5 * words) / sentences - 21.43
  );
  return level <= 0 ? 0 : level;
}

export function getAdverbs(sentence) {
  let lyWords = getLyWords();
  return sentence
    .split(" ")
    .map((word) => {
      if (
        word.replace(/[^a-z0-9. ]/gi, "").match(/ly$/) &&
        lyWords[word.replace(/[^a-z0-9. ]/gi, "").toLowerCase()] === undefined
      ) {
        data.adverbs += 1;
        return `<span class="adverb">${word}</span>`;
      } else {
        return word;
      }
    })
    .join(" ");
}

export function getComplex(sentence) {
  let words = getComplexWords();
  let wordList = Object.keys(words);
  wordList.forEach((key) => {
    sentence = findAndSpan(sentence, key, "complex");
  });
  return sentence;
}

export function findAndSpan(sentence, string, type) {
  let index = sentence.toLowerCase().indexOf(string);
  let a = { complex: "complex", qualifier: "adverbs" };
  if (index >= 0) {
    data[a[type]] += 1;
    sentence =
      sentence.slice(0, index) +
      `<span class="${type}">` +
      sentence.slice(index, index + string.length) +
      "</span>" +
      findAndSpan(sentence.slice(index + string.length), string, type);
  }
  return sentence;
}

export function getQualifier(sentence) {
  let qualifiers = getQualifyingWords();
  let wordList = Object.keys(qualifiers);
  wordList.forEach((key) => {
    sentence = findAndSpan(sentence, key, "qualifier");
  });
  return sentence;
}
