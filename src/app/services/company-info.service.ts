import { CompanyInfo } from './../home/shared/Company-Info.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class CompanyInfoService { 

    private messageSource = new BehaviorSubject<CompanyInfo>({
        associateWage:0,
        associateWagePercent:0,
        companyIncomePercentTax:0,
        companyProfitTax:0,
        employeeTax:0,
        inssTax:0,
        irpfTax:0,
        profitBeforeTax:0,
        totalProfit:0,
        totalTaxes:0,
    });

    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(companyInfo: CompanyInfo) {
        this.messageSource.next(companyInfo);
    }

}