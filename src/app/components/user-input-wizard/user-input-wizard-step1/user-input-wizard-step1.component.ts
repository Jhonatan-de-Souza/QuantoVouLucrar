import { RouterExtensions } from 'nativescript-angular/router';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CompanyInfoService } from '~/app/services/company-info.service';
import { CompanyInfo } from '~/app/components/shared/Company-Info.model';
import { Page } from 'tns-core-modules/ui/page/page';
import { TextField } from "tns-core-modules/ui/text-field";
import { Router } from '@angular/router';


@Component({
  selector: 'ns-user-input-wizard-step1',
  templateUrl: './user-input-wizard-step1.component.html',
  styleUrls: ['./user-input-wizard-step1.component.css'],
  moduleId: module.id,
})
export class UserInputWizardStep1Component implements OnInit, AfterViewInit {
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
  //empresaUsaFatorR = false; // se a empresa usar o fator R ela necessáriamente tem que ter uma contribuição que representa 28% total do faturamento da empresa e tem que ser maior que o salário mínimo caso 28% da renda total da empresa não chegue a o salário mínimo é necessário que simplesmente seja usado o salário mínimo como valor para cálculo
  @ViewChild("firstTax",{static:false}) firstTaxInput: ElementRef;
  
  constructor(private companyInfoService: CompanyInfoService, private page: Page,private routerExtensions: RouterExtensions) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.companyInfoService.currentMessage.subscribe(data => this.companyInfo = data)
  
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstTaxInput.nativeElement.focus();
    },600);
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
