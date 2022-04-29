import React, { useState } from "react";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        let keyValue = event;
        if ('target' in event) {
            keyValue = event.target.value;
        } else {
            keyValue = event;
        }
        setValue(keyValue);
    }

    return {
        value,
        onChange: handleChange
    };
};

export default useInput;