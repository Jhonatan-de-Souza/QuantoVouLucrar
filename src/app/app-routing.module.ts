import { UserInputWizardStep1Component } from './components/user-input-wizard/user-input-wizard-step1/user-input-wizard-step1.component';
import { UserInputWizardStep2Component } from './components/user-input-wizard/user-input-wizard-step2/user-input-wizard-step2.component';
import { UserInputWizardStep3Component } from './components/user-input-wizard/user-input-wizard-step3/user-input-wizard-step3.component';
import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { ResultadosComponent } from './resultados/resultados.component';

const routes: Routes = [
    // { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "", redirectTo: "/userinputwizard1", pathMatch: "full" },
    { path: "userinputwizard1", component: UserInputWizardStep1Component },
    { path: "userinputwizard2", component: UserInputWizardStep2Component },
    { path: "userinputwizard3", component: UserInputWizardStep3Component },
    { path: "resultados", component: ResultadosComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

