export default function AlphLetter(props) {
    let backgroundColor = '#FCBA29';

    if (props.isCorrect) {
        backgroundColor = '#10A95B';
    } else if (props.isIncorrect) {
        backgroundColor = '#EC5D49';
    }

    let opacity = 100;
    let cursor = props.isCorrect || props.isIncorrect ? 'default' : 'pointer';

    if (props.disabled) {
        opacity = 0.5;
        cursor = 'not-allowed';
    }

    const style = {
        backgroundColor,
        color: '#1E1E1E',
        opacity,
        cursor
    };

    return (
        <button
            disabled={props.disabled}
            style={style}
            className="alphLetterBox"
            // Adding empty function tells React do nothing until the button is clicked.
            // When clicked, it calls onLetterClick(alphLetter) with the correct letter.
            // alphLetter is passed in as a prop from App.jsx. Once clicked, AlphLetter component tells
            // App.jsx which letter was clicked by calling the function passed in as a prop: onLetterClick
            onClick={() => {
                props.onLetterClick(props.alphLetter);
            }}
        >
            <p>{props.alphLetter}</p>
        </button>
    );
}
