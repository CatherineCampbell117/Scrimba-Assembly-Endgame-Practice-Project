import { useState } from 'react';
import './App.css';
import { languages } from './languages';
import Chip from './Components/Chip';
import LetterBox from './Components/letterBox';
import AlphLetter from './Components/AlphLetter';

export default function Hangman() {
    const [guessedLetters, setGuessedLetters] = useState([]);

    function LetterGuessed(letter) {
        setGuessedLetters(prev => [...prev, letter]);
    }
    console.log(guessedLetters);

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const alphabetLetters = alphabet
        .split('')
        .map((alphLetter, index) => (
            <AlphLetter
                key={index}
                alphLetter={alphLetter.toUpperCase()}
                onLetterClick={LetterGuessed}
            />
        ));

    const langChips = languages.map(langObj => (
        <Chip lang={langObj.name} bgColor={langObj.backgroundColor} textColor={langObj.color} />
    ));

    const [currentWord, setCurrentWord] = useState('react');

    const wordLetters = currentWord
        .split('')
        .map((letter, index) => <LetterBox key={index} letter={letter.toUpperCase()} />);

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
            </main>
        </>
    );
}
