import { useState } from 'react';
import './App.css';
import { languages } from './languages';
import Chip from './Components/Chip';
import LetterBox from './Components/letterBox';
import AlphLetter from './Components/AlphLetter';

export default function Hangman() {
    const [currentWord, setCurrentWord] = useState('react');
    const [GuessedLetters, setGuessedLetters] = useState([]);

    const wrongGuessCount = GuessedLetters.filter(
        letter => !currentWord.toUpperCase().includes(letter)
    ).length;

    console.log(wrongGuessCount);

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    function LetterGuessed(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        );
    }

    console.log(GuessedLetters);

    const langChips = languages.map(langObj => (
        <Chip lang={langObj.name} bgColor={langObj.backgroundColor} textColor={langObj.color} />
    ));

    const wordLetters = currentWord.split('').map((letter, index) => {
        const upperLetter = letter.toUpperCase();
        const isRevealed = GuessedLetters.includes(upperLetter);
        return <LetterBox key={index} letter={upperLetter} CorrectGuess={isRevealed} />;
    });

    const alphabetLetters = alphabet.split('').map((alphLetter, index) => {
        const upperLetter = alphLetter.toUpperCase();
        const isGuessed = GuessedLetters.includes(upperLetter);
        const isCorrect = isGuessed && currentWord.toUpperCase().includes(upperLetter);
        const isIncorrect = isGuessed && !currentWord.toUpperCase().includes(upperLetter);
        return (
            <AlphLetter
                isGuessed={isGuessed}
                isCorrect={isCorrect}
                isIncorrect={isIncorrect}
                key={index}
                alphLetter={alphLetter.toUpperCase()}
                onLetterClick={LetterGuessed}
            />
        );
    });

    return (
        <>
            <main>
                <header>
                    <h1>Assembly: Endgame</h1>
                    <p>
                        Guess the word in under 8 attempts to keep the programming world safe from
                        Assembly!
                    </p>
                </header>

                <section className="gameStatus">
                    <h2>You Win!</h2>
                    <p>Well done! 🎉</p>
                </section>
                <section className="chipsContainer">{langChips}</section>
                <section className="wordContainer">{wordLetters}</section>
                <section className="alphabetContainer">{alphabetLetters}</section>
                <button className="new-game">New Game</button>
            </main>
        </>
    );
}
