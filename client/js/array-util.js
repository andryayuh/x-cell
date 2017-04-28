const getRange = function(fromNum, toNum) {
	return Array.from({ length: toNum - fromNum + 1 },
		(unused, i) => i + fromNum);
};

const getLetterRange = function(firstLetter = 'A', numLetters) {
	const rangeStart = firstLetter.charCodeAt(0);
	const rangeEnd = rangeStart + numLetters - 1;
	return getRange(rangeStart, rangeEnd)
		.map(charCode => String.fromCharCode(charCode));
		// conversts number of letters to unicode to a sequence of letters
};

module.exports = {
	getRange: getRange,
	getLetterRange: getLetterRange
};