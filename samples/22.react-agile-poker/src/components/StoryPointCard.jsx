/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Subtitle2, mergeClasses } from "@fluentui/react-components";
import { getFlexColumnStyles } from "../styles/layout";

export const StoryPointCard = ({ value, selectedValue }) => {
    const flexColumnStyles = getFlexColumnStyles();
    return (
        <div
            className={mergeClasses(
                flexColumnStyles.root,
                flexColumnStyles.vAlignCenter,
                flexColumnStyles.hAlignCenter
            )}
            style={{
                width: "5.5rem",
                height: "7rem",
                backgroundColor: selectedValue === value ? "#8322FE" : "white",
                color: "black",
                borderRadius: "0.25rem",
                marginBottom: "0.8rem",
                cursor: "pointer",
            }}
        >
            <Subtitle2>{value}</Subtitle2>
        </div>
    );
};
