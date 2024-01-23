export const isValidWord = (
  lastWord: string,
  secondLastWord: string
): string => {
  // word is not the same
  const sameWord = lastWord === secondLastWord;
  if (sameWord === true) {
    return "Please make sure you type a word different from the previous one";
  }
  // word length is the same
  const lengthCheck = lastWord.length == secondLastWord.length;
  if (lengthCheck === false) {
    return "Please make sure your word is of the same length as the start word";
  }

  // word consists of letters only
  const lettersOnly = /^[A-Za-z]+$/.test(lastWord);
  if (lettersOnly === false) {
    return "Please make sure your word only consists of letters";
  }

  // rule of doublet followed
  const wordCheck =
    [...lastWord].filter((char, i) => char !== secondLastWord[i]).length === 1;
  if (wordCheck === false) {
    return "Please make sure you're changing at most one character";
  }

  // no error
  return "";
};
