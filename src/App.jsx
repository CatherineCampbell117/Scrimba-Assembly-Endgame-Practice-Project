import { useState } from 'react';
import './App.css';
import { languages } from './languages';
import Chip from './Components/Chip';
import LetterBox from './Components/letterBox';
import AlphLetter from './Components/AlphLetter';
import { getFarewellText } from './utils';

export default function Hangman() {
    // State values
    const [currentWord, setCurrentWord] = useState('react');
    const [GuessedLetters, setGuessedLetters] = useState([]);
    const [currentGuess, setCurrentGuess] = useState('');

    // Static values
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // Derived values
    let wrongGuessCount = GuessedLetters.filter(
        letter => !currentWord.toUpperCase().includes(letter)
    ).length;

    /**
     * Determines if the game is won by checking if every letter in the current word
     * has been guessed.
     * Determines if the game is lost by comparing the number of wrong guesses
     * to the total number of language chips.
     * `isGameOver` is true if either win or loss condition is met.
     */
    const isGameWon = currentWord
        .toUpperCase()
        .split('')
        .every(letter => GuessedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const isGameOver = isGameWon || isGameLost;
    const isWrongGuess = currentGuess && !currentWord.toUpperCase().includes(currentGuess);
    const recentlyLostLanguage = wrongGuessCount > 0 ? languages[wrongGuessCount - 1]?.name : null;

    // Functions
    /**
     * Adds a guessed letter to the list of previously guessed letters,
     * only if it hasn't been guessed already
     * @param {string} letter - The letter that the user has guessed.
     */
    function LetterGuessed(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        );
        setCurrentGuess(letter);
    }

    /**
     * Returns the appropriate class name for the game status section
     * based on whether the game is won, lost, or still in progress.
     */

    function classList() {
        if (isGameWon) {
            return 'gameStatus won';
        } else if (isGameLost) {
            return 'gameStatus lost';
        } else if (isWrongGuess) {
            return 'gameStatus wrong';
        } else {
            return 'gameStatus';
        }
    }

    console.log(`Wrong Guesses: ${wrongGuessCount}`);
    console.log(`Game Lost: ${isGameLost}`);
    console.log(`Game Over: ${isGameOver}`);
    console.log(`Wrong Guess: ${isWrongGuess}`);

    // Components mapping
    /**
     * Maps over each language object from the imported `languages` array.
     * For each language, determines whether it should be marked as "lost"
     * based on the number of wrong guesses.
     * Returns a Chip component with relevant props including name, background color,
     * text color, and a flag to conditionally apply the "lost" class.
     */
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

    console.log(GuessedLetters);

    /**
     * Splits the current word into individual letters and maps over them.
     * Converts each letter to uppercase and checks if it has been guessed.
     * Returns a LetterBox component for each letter, with a flag indicating
     * whether it should be revealed.
     */
    const wordLetters = currentWord.split('').map((letter, index) => {
        const upperLetter = letter.toUpperCase();
        const isRevealed = GuessedLetters.includes(upperLetter);
        return <LetterBox key={index} letter={upperLetter} CorrectGuess={isRevealed} />;
    });

    /**
     * Maps over each letter in the alphabet.
     * Converts each letter to uppercase and checks if it has been guessed.
     * Determines whether the guessed letter is correct or incorrect.
     * Returns an AlphLetter component with props reflecting its guessed status.
     */
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
                disabled={isGameOver}
            />
        );
    });

    //JSX return

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
                {/* Runs classList to determine appropriate styling for game status */}
                <section className={classList()}>
                    <h2>
                        {isGameWon
                            ? 'You Win!'
                            : '' || isGameLost
                            ? 'Game over!'
                            : '' || isWrongGuess
                            ? getFarewellText(recentlyLostLanguage) + '🫡'
                            : ''}
                    </h2>
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
                {/* Conditionally renders the "New Game" button if the game is over */}
                {isGameOver && <button className="new-game">New Game</button>}
            </main>
        </>
    );
}
