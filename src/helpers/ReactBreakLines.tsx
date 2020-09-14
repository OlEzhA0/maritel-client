import React from "react";

const ReactBreakLines = (props: { text: string }) => {
    return (
        <>
            {props.text.split(/$/gm).map((paragraph) => (
                <>
                    {paragraph}
                    <br />
                </>
            ))}
        </>
    );
};

export default ReactBreakLines;
