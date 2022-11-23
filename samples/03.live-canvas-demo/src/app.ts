/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { View } from "./view";
import { ConfigView } from "./config-view";
import { StageView } from "./stage-view";
import { SidebarView } from "./sidebar-view";
import * as Utils from "./utils";
import { parseColorHexRGB } from "@microsoft/fast-colors"
import { fluentButton, fluentSelect, fluentTextField, accentFillRest,accentFillActive,accentFillHover,fluentOption, provideFluentDesignSystem,
    baseLayerLuminance,bodyFont, typeRampPlus1FontSize, SwatchRGB } from '@fluentui/web-components';

     provideFluentDesignSystem().register([fluentButton(),fluentOption(),fluentSelect(),fluentTextField()]);

if(Utils.runningInTeams())
{   
    baseLayerLuminance.withDefault(0);    
    
}
else
    baseLayerLuminance.withDefault(0.15);
    bodyFont.withDefault(typeRampPlus1FontSize);
 
    const colorRest = parseColorHexRGB("#5256B6");
if(colorRest)
    accentFillRest.withDefault(SwatchRGB.from(colorRest));
const colorHover = parseColorHexRGB("#5B5FC7");
if(colorHover)
    accentFillHover.withDefault(SwatchRGB.from(colorHover));
const colorActive = parseColorHexRGB("#484BA0");
if(colorActive)
    accentFillActive.withDefault(SwatchRGB.from(colorActive));


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

    view.start();
};
