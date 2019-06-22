import { Component, OnInit } from "@angular/core";
import { CompanyInfoService } from "../services/company-info.service";
import { CompanyInfo } from "../home/shared/Company-Info.model";

@Component({
    selector: 'app-resultado',
    templateUrl: 'resultados.component.html',
    styleUrls: ['./resultados.component.css'],
    moduleId: module.id
})

export class ResultadosComponent implements OnInit {
    companyInfo: CompanyInfo = {
        associateWage : 0,
        associateWagePercent: 0,
        companyProfitTax: 0,
        companyIncomePercentTax:0,
        employeeTax: 0,
        inssTax: 0,
        irpfTax: 0,
        profitBeforeTax: 0,
        totalProfit: 0,
        totalTaxes:0,
      };

    constructor(private companyInfoService: CompanyInfoService) { }


    ngOnInit() {
        this.companyInfoService.currentMessage.subscribe(data => this.companyInfo = data)
        console.log(this.companyInfo);
    }
}
