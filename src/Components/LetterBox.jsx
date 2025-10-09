export default function LetterBox(props) {
    const style = {
        backgroundColor: '#323232',
        color: '#F9F4DA'
    };

    return (
        <span style={style} className="letterBox">
            <p>{props.letter}</p>
        </span>
    );
}
