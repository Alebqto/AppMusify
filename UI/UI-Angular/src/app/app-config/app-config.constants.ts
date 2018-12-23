import { InjectionToken } from "@angular/core";
import { IAppConfig } from "./app-config.interface";

export const APP_DI_CONFIG: IAppConfig = {

    STORE_KEY: 'l@_list@'

};

export let APP_CONFIG = new InjectionToken< IAppConfig >( 'app.config' );