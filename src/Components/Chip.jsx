export default function Chip(props) {
    const style = {
        backgroundColor: props.bgColor,
        color: props.textColor
    };

    return (
        <div style={style} className="chip">
            <p>{props.lang}</p>
        </div>
    );
}
