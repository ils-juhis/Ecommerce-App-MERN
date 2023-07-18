import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default function ColoredScrollbar (props) {
    const [top, setTop] = useState(0);

    function handleUpdate(values) {
        let { top } = values;
        setTop(top);
    }

    function renderView({ style, ...props }) {
        const viewStyle = {
            padding: 15,
            backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(top * 255)}, ${Math.round(255)})`,
            color: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
        };
        return (
            <div
                className="box"
                style={{ ...style, ...viewStyle }}
                {...props}/>
        );
    }

    function renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    return (
        <Scrollbars
            renderView={renderView}
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
            onUpdate={handleUpdate}
            {...props}/>
    );
}
