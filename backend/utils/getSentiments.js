import pkg from 'natural';
const { SentimentAnalyzer, PorterStemmer, WordTokenizer } = pkg
import { removeStopwords } from "stopword";

export function getSentiment(text) {
    const alphaOnlyReview = text.replace(/[^a-zA-Z\s]+/g, '');
    const tokenizer = new WordTokenizer();
    const tokenizedText= tokenizer.tokenize(alphaOnlyReview);
    const filteredText = removeStopwords(tokenizedText);
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    return analyzer.getSentiment(filteredText);
}