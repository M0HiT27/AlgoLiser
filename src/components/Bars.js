import React from "react";
import classNames from "classnames";
export default function Bars(props) {
    const highlightIndex = props.hightlightedIndices;
    const barClass = classNames({
        'bar': true,
        'inAction': (highlightIndex.i === props.index || highlightIndex.j === props.index),

    });
    return <div className={barClass} style={{ height: props.height }}>

    </div>
}