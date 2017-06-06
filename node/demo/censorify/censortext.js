var censoreWords = ['sad', 'bad', 'mad'];
var customCensoreWords = [];

function censor (inStr) {
  for (var idx in censoreWords) {
    inStr = inStr.replace(censoreWords[idx], '****');
  }
  for (var idx in customCensoreWords) {
    inStr = inStr.replace(customCensoreWords[idx], '****');
  }
  return inStr;
}

function addCensoreWord(word) {
  customCensoreWords.push(word);
}

function getCensoreWords() {
  return censoreWords.concat(customCensoreWords);
}

exports.censor = censor;
exports.addCensoreWord = addCensoreWord;
exports.getCensoreWords = getCensoreWords;
