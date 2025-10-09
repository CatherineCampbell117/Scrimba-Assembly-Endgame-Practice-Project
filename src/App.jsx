import { useState } from 'react';
import './App.css';
import { languages } from './languages';
import Chip from './Components/Chip';
import LetterBox from './Components/letterBox';

export default function Hangman() {
    const langChips = languages.map(langObj => (
        <Chip
            lang={langObj.name}
            bgColor={langObj.backgroundColor}
            textColor={langObj.color}
        ></Chip>
    ));

    const [currentWord, setCurrenbtWord] = useState('react');

    const wordLetters = currentWord
        .split('')
        .map((letter, index) => <LetterBox key={index} letter={letter.toUpperCase()}></LetterBox>);

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
            </main>
        </>
    );
}
