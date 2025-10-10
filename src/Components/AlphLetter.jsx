export default function AlphLetter(props) {
    const style = {
        backgroundColor: '#FCBA29',
        color: '#1E1E1E'
    };

    return (
        <button style={style} className="alphLetterBox">
            <p>{props.alphLetter}</p>
        </button>
    );
}
