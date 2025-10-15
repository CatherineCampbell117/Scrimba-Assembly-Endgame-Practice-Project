import { useState } from 'react';
import './App.css';
import { languages } from './languages';
import Chip from './Components/Chip';
import LetterBox from './Components/letterBox';
import AlphLetter from './Components/AlphLetter';

export default function Hangman() {
    // State values
    const [currentWord, setCurrentWord] = useState('react');
    const [GuessedLetters, setGuessedLetters] = useState([]);

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    let wrongGuessCount = GuessedLetters.filter(
        letter => !currentWord.toUpperCase().includes(letter)
    ).length;

    const langChips = languages.map((langObj, index) => {
        const addLost = index < wrongGuessCount;
        return (
            <Chip
                key={index}
                lang={langObj.name}
                bgColor={langObj.backgroundColor}
                textColor={langObj.color}
                addLostClass={addLost}
            />
        );
    });

    const isGameWon = currentWord
        .toUpperCase()
        .split('')
        .every(letter => GuessedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const isGameOver = isGameWon || isGameLost;

    console.log(`Wrong Guesses: ${wrongGuessCount}`);
    console.log(`Game Lost: ${isGameLost}`);
    console.log(`Game Over: ${isGameOver}`);

    function LetterGuessed(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        );
    }

    console.log(GuessedLetters);

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

    function classList() {
        if (isGameWon) {
            return 'gameStatus won';
        } else if (isGameLost) {
            return 'gameStatus lost';
        } else {
            return 'gameStatus';
        }
    }

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

                <section className={classList()}>
                    <h2>{isGameWon ? 'You Win!' : '' || isGameLost ? 'Game over!' : ''}</h2>
                    <p>
                        {isGameWon
                            ? 'Well done!🎉'
                            : '' || isGameLost
                            ? 'You lose! Better start learning Assembly 😭'
                            : ''}
                    </p>
                </section>
                <section className="chipsContainer">{langChips}</section>
                <section className="wordContainer">{wordLetters}</section>
                <section className="alphabetContainer">{alphabetLetters}</section>
                {isGameOver && <button className="new-game">New Game</button>}
            </main>
        </>
    );
}
