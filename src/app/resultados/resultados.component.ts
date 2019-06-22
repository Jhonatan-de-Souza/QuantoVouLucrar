import { Component, Input } from "@angular/core";

@Component ({
    selector: 'app-resultado',
    templateUrl: 'resultados.component.html',
    moduleId: module.id
})

export class ResultadosComponent {
@Input() impostoEmpresaAPagar   ;
@Input() inssAPagar;
@Input() irpfAPagar;
@Input() totalAPagar;
@Input() quantoVouLucrar;
}