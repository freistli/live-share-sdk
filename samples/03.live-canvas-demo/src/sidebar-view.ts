/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the Microsoft Live Share SDK License.
 */

import * as Utils from "./utils";
import { View } from "./view";
import { app, meeting } from "@microsoft/teams-js";

export class SidebarView extends View {
    public static fluidOption :string|undefined = "TeamsDefault";
    constructor() {
        super();

        let template = `<div>Welcome to the Live Share Canvas demo
        
        <p/>
        <select id="fluidOption">
        
        <option value="TeamsDefault" selected>Teams Default</option>
        <option value="Local">Local</option>
        <option value="RemoteInsecure">Remote Insecure</option>
        <option value="RemoteSecure">Remote Secure</option>
        </select>
        
        <p/>
        <text id="userSelected"/>

        </div>`;

        const setupDropdown = (id: string, onChange: (event: any) => void) => {
            const dropdownList = document.getElementById(id);
    
            if (dropdownList) {
                dropdownList.onchange = onChange;
            }
        };



        if (Utils.runningInTeams()) {
            template += `<button id="btnShareToStage">Share to Stage</button>`;
        }

        Utils.loadTemplate(template, document.body);

        const element = document.getElementById("userSelected");
        

        if(element)
            element.innerText = "You choosed: " + SidebarView.fluidOption;

        setupDropdown("fluidOption",(any)=>{
            SidebarView.fluidOption = any.target.value;
             if(element)
             element.innerText = "You choosed: " + SidebarView.fluidOption;
        });

        const shareToStageButton = document.getElementById("btnShareToStage");

        if (shareToStageButton) {
            shareToStageButton.onclick = () => {
                meeting.shareAppContentToStage((error, result) => {
                    if (!error) {
                        console.log("Started sharing to stage");
                    } else {
                        console.warn("shareAppContentToStage failed", error);
                    }
                }, window.location.origin + "?inTeams=1&view=stage&fluidOption="+SidebarView.fluidOption);
            };
        }
    }

    start() {
        app.initialize();
        app.notifySuccess();
    }
}
