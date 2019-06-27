import { Component, OnInit } from "@angular/core";
import { CompanyInfoService } from "../services/company-info.service";
import { CompanyInfo } from "../home/shared/Company-Info.model";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: 'app-resultado',
    templateUrl: 'resultados.component.html',
    styleUrls: ['./resultados.component.css'],
    moduleId: module.id
})

export class ResultadosComponent implements OnInit {
    companyInfo: CompanyInfo = {
        associateWage: 0,
        associateWagePercent: 0,
        companyProfitTax: 0,
        companyIncomePercentTax: 0,
        employeeTax: 0,
        inssTax: 0,
        irpfTax: 0,
        profitBeforeTax: 0,
        totalProfit: 0,
        totalTaxes: 0,
    };

    day: string;
    date: number;
    month: string;
    year: number;
    taxes: Array<any>;

    constructor(private routerExtensions: RouterExtensions, private page: Page, private companyInfoService: CompanyInfoService) { }


    ngOnInit() {
        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        
        this.companyInfoService.currentMessage.subscribe(data => this.companyInfo = data)
        this.page.actionBarHidden = true;
        var currentDate = new Date();
        var day = currentDate.getDay();
        var date = currentDate.getDate();
        var year = currentDate.getFullYear();

        var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";
        var dayName = weekdays[day];

        this.day = dayName;
        this.date = date;
        this.year = year;

        var month = new Array();
        month[0] = "Janeiro";
        month[1] = "Fevereiro";
        month[2] = "Março";
        month[3] = "Abril";
        month[4] = "Maio";
        month[5] = "Junho";
        month[6] = "Julho";
        month[7] = "Agosto";
        month[8] = "Setembro";
        month[9] = "Outubro";
        month[10] = "Novembro";
        month[11] = "Dezembro";

        var monthName = month[currentDate.getMonth()];
        this.month = monthName;
        this.companyInfo.companyProfitTax = formatter.format(parseInt(this.companyInfo.companyProfitTax));
        this.companyInfo.inssTax = formatter.format(parseInt(this.companyInfo.inssTax));
        this.companyInfo.irpfTax = formatter.format(parseInt(this.companyInfo.irpfTax));
        this.companyInfo.totalProfit = formatter.format(parseInt(this.companyInfo.totalProfit));
        this.companyInfo.totalTaxes = formatter.format(parseInt(this.companyInfo.totalTaxes));
        
        this.taxes = [{
            name: "Taxa CNAE",
            description: "Imposto sob Faturamento",
            amount: this.companyInfo.companyProfitTax,
            last: false
        },
        {
            name: "INSS",
            description: "Taxa INSS/Previdência Social",
            amount: this.companyInfo.inssTax,
            last: false
        },
        {
            name: "IRPF",
            description: "Imposto de Renda Pessoa Física",
            amount: this.companyInfo.irpfTax,
            last: true
        }
        ]
    };
}