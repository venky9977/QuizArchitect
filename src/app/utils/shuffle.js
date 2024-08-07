// utils/shuffle.js
export function shuffleQuestions(array) {
  let currentIndex = array.length, randomIndex;
  const questionsCopy = array.map(question => ({ ...question }));

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [questionsCopy[currentIndex], questionsCopy[randomIndex]] = [questionsCopy[randomIndex], questionsCopy[currentIndex]];
  }

  return questionsCopy;
}
