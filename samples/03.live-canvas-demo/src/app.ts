/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { View } from "./view";
import { ConfigView } from "./config-view";
import { StageView } from "./stage-view";
import { SidebarView } from "./sidebar-view";
import * as Utils from "./utils";

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view") || "stage";
    const fluidOption = params.get("fluidOption") || "Local";
    const containerID = params.get("containerID") || "empty";

    let view: View;

    switch (viewParam.toLowerCase()) {
        case "config":
            view = new ConfigView();
            break;
        case "stage":
            view = new StageView(fluidOption,containerID);
            break;
        default:
            view = new SidebarView();
            break;
    }
    Utils.loadTemplate(`<div>`+viewParam+`</div>`,document.body);

    view.start();
};
