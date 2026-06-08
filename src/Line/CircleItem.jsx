import "./CircleItem.css";

function CircleItem(props){

    return(

        <div
            className={
                props.selected
                    ? "circle selected"
                    : "circle"
    }
            style={{
                top: props.top,
                left: props.left
            }}
            onClick={props.onClick}
        >
            {props.text}
        </div>

    );

}

export default CircleItem;