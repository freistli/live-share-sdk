/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the Microsoft Live Share SDK License.
 */

import * as Utils from "./utils";
import { View } from "./view";
import { app, pages } from "@microsoft/teams-js";

export class ConfigView extends View {

    public static fluidOption :string|undefined = "TeamsDefault";

    private onSavePagesConfig = async (saveEvent: pages.config.SaveEvent) => {
        const host = "https://" + window.location.host;

        await pages.config.setConfig({
            contentUrl: window.location.origin + "?inTeams=1&view=sideBar",
            websiteUrl: window.location.origin,
            suggestedDisplayName: "Live Share Canvas demo",
            entityId: ConfigView.fluidOption
        });
        
        saveEvent.notifySuccess();
    };

  
    constructor() {
        super();

        const template = `<div>This is the config page. Choose Fluid Service type.
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
        Utils.loadTemplate(template, document.body);
        
        const element = document.getElementById("userSelected");
        
        pages.getConfig().then(

           c => ConfigView.fluidOption = c.entityId 

        );

        if(element)
            element.innerText = "You choosed: " + ConfigView.fluidOption;

        setupDropdown("fluidOption",(any)=>{
            ConfigView.fluidOption = any.target.value;
             if(element)
             element.innerText = "You choosed: " + ConfigView.fluidOption;
        });

        
    }

    start() {
        if (Utils.runningInTeams()) {
            app.initialize();
            pages.config.registerOnSaveHandler(this.onSavePagesConfig);
            pages.config.setValidityState(true);
            app.notifySuccess();
        }
    }
}
