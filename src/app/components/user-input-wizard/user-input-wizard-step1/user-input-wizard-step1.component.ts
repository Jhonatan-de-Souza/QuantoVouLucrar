import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from '~/app/services/company-info.service';
import { CompanyInfo } from '~/app/components/shared/Company-Info.model';
import { Page } from 'tns-core-modules/ui/page/page';


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
    profitBeforeTax: '',
    totalProfit: undefined,
    totalTaxes: undefined,
  };
  constructor(private companyInfoService: CompanyInfoService, private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.companyInfoService.currentMessage.subscribe(data => this.companyInfo = data)
  }

  calculateTaxes() {
    this.updateCompanyInfo();
  }
  updateCompanyInfo() {
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
