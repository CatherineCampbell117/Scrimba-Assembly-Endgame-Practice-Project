import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { languages } from './languages';
import Chip from './Components/Chip';

const langChips = languages.map(langObj => (
    <Chip lang={langObj.name} bgColor={langObj.backgroundColor} textColor={langObj.color}></Chip>
));

export default function Hangman() {
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

                <div className="noticeBlock">
                    <h2>You Win!</h2>
                    <p>Well done! 🎉</p>
                </div>
                <div className="chipsContainer">{langChips}</div>
            </main>
        </>
    );
}
