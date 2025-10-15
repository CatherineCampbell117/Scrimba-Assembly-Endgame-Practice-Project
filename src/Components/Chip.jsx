export default function Chip(props) {
    const style = {
        backgroundColor: props.bgColor,
        color: props.textColor
    };

    return (
        <div style={style} className={props.addLostClass ? 'chip lost' : 'chip'}>
            <p>{props.lang}</p>
        </div>
    );
}
