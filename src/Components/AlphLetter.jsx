export default function AlphLetter(props) {
    const style = {
        backgroundColor: '#FCBA29',
        color: '#1E1E1E'
    };

    return (
        <button
            style={style}
            className="alphLetterBox"
            // Adding empty function tells React do nothing until the button is clicked.
            // When clicked, it calls onLetterClick(alphLetter) with the correct letter.
            // alphLetter is passed in as a prop from App.jsx. Once clicked, AlphLetter component tells
            // App.jsx which letter was clicked by calling the function passed in as a prop: onLetterClick
            onClick={() => props.onLetterClick(props.alphLetter)}
        >
            <p>{props.alphLetter}</p>
        </button>
    );
}
