export default function LetterBox(props) {
    const style = {
        backgroundColor: '#323232',
        color: '#F9F4DA'
    };

    function classList() {
        if (props.RevealLetter) {
            return 'letterRevealed';
        } else if (props.CorrectGuess) {
            return '';
        } else {
            return 'letterHidden';
        }
    }

    return (
        <span style={style} className="letterBox">
            <p className={classList()}>{props.letter}</p>
        </span>
    );
}
