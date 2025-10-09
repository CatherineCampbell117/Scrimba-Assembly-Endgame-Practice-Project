export default function Chip(props) {
    const style = {
        backgroundColor: props.bgColor,
        color: props.textColor
    };

    return (
        <div style={style}>
            <p>{props.lang}</p>
        </div>
    );
}
