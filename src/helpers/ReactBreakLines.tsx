import React from "react";

const ReactBreakLines = (props: { text: string }) => {
    return (
        <>
            {props.text.split(/$/gm).map((paragraph, i) => (
                <span key={i}>
                    {paragraph}
                    <br />
                </span>
            ))}
        </>
    );
};

export default ReactBreakLines;
