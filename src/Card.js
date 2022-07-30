import './Card.css';

function Card(props) {
    var classes = 'card ' + props.className;

    return (
        <div className={classes}>
            {props.children}
        </div>
    );
}

export default Card;