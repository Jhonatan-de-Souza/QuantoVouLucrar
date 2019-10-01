import { CompanyInfoService } from './services/company-info.service';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ResultadosComponent } from "./components/resultados/resultados.component";
import { UserInputWizardStep1Component } from './components/user-input-wizard/user-input-wizard-step1/user-input-wizard-step1.component';
import { UserInputWizardStep2Component } from './components/user-input-wizard/user-input-wizard-step2/user-input-wizard-step2.component';
import { UserInputWizardStep3Component } from './components/user-input-wizard/user-input-wizard-step3/user-input-wizard-step3.component';

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({


    
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ResultadosComponent,
        UserInputWizardStep1Component,
        UserInputWizardStep2Component,
        UserInputWizardStep3Component
    ],
    providers: [CompanyInfoService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
