import { CompanyInfo } from '../components/shared/Company-Info.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class CompanyInfoService { 

    private messageSource = new BehaviorSubject<CompanyInfo>({
        associateWage:undefined,
        associateWagePercent:undefined,
        companyIncomePercentTax:undefined,
        companyProfitTax:undefined,
        employeeTax:undefined,
        inssTax:undefined,
        irpfTax:undefined,
        profitBeforeTax:undefined,
        totalProfit:undefined,
        totalTaxes:undefined,
    });

    currentMessage = this.messageSource.asObservable();

    constructor() { 
      
    }

    changeMessage(companyInfo: CompanyInfo) {
        this.messageSource.next(companyInfo);
    }

}