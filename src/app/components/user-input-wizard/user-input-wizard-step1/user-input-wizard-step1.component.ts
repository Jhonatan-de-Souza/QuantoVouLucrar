import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from '~/app/services/company-info.service';
import { CompanyInfo } from '~/app/components/shared/Company-Info.model';


@Component({
  selector: 'ns-user-input-wizard-step1',
  templateUrl: './user-input-wizard-step1.component.html',
  styleUrls: ['./user-input-wizard-step1.component.css'],
  moduleId: module.id,
})
export class UserInputWizardStep1Component implements OnInit {
  companyInfo: CompanyInfo = {
    associateWage: undefined,
    associateWagePercent: undefined,
    companyProfitTax: undefined,
    companyIncomePercentTax: undefined,
    employeeTax: undefined,
    inssTax: undefined,
    irpfTax: undefined,
    profitBeforeTax: undefined,
    totalProfit: undefined,
    totalTaxes: undefined,
  };
  constructor(private companyInfoService: CompanyInfoService) { }

  ngOnInit() {
    this.companyInfoService.currentMessage.subscribe(data => this.companyInfo = data)
   }
  
  formatMe() {
    console.log('stored value' + this.companyInfo.profitBeforeTax);
   }
  calculateTaxes(){
    console.log("the current value of profit Before tax: "+ this.companyInfo.profitBeforeTax)
    // this.companyInfo.associateWagePercent = 28;
    // this.companyInfo.profitBeforeTax = 100000000;
    // this.companyInfo.companyIncomePercentTax = 15.5;
    this.updateCompanyInfo();
  }
  updateCompanyInfo(){
    this.companyInfoService.changeMessage({
      associateWage: this.companyInfo.associateWage,
      associateWagePercent: this.companyInfo.associateWagePercent,
      companyIncomePercentTax: this.companyInfo.companyIncomePercentTax,
      companyProfitTax: this.companyInfo.companyProfitTax,
      employeeTax: this.companyInfo.employeeTax,
      inssTax: this.companyInfo.inssTax,
      irpfTax: this.companyInfo.irpfTax,
      profitBeforeTax: this.companyInfo.profitBeforeTax,
      totalProfit: this.companyInfo.totalProfit,
      totalTaxes: this.companyInfo.totalTaxes
    });
  }
}
  