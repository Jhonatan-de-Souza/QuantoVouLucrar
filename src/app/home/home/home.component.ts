import { CompanyInfoService } from './../../services/company-info.service';
import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { CompanyInfo } from '../shared/Company-Info.model';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit {
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
  message:string;

  constructor(private page: Page,private companyInfoService: CompanyInfoService) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.companyInfoService.currentMessage.subscribe(data => this.companyInfo = data)
  }
  calculateTaxes() {
    this.calculateTaxesOnProfit();
    this.calculateInssTaxes();
    this.calculateInrfTaxes();
    this.calculateTotalTaxesToPay();
    this.calculateCompanyProfit();
  }
  
  calculateTaxesOnProfit() {
    this.companyInfo.companyProfitTax = this.companyInfo.profitBeforeTax  * (this.companyInfo.companyIncomePercentTax / 100);
  }
  // Calcula INSS - Previdência Social
  calculateInssTaxes() {
    const inssTaxOnWage = 0.11; // Percentual Inss sobre Salário
    this.companyInfo.associateWage = this.companyInfo.profitBeforeTax * (this.companyInfo.associateWagePercent / 100);
    this.companyInfo.inssTax = Math.round(this.companyInfo.associateWage * inssTaxOnWage);
  }

  //Calcular Imposto de Renda Pessoa Física
  calculateInrfTaxes() {
    const wage = this.companyInfo.associateWage - this.companyInfo.inssTax;
    const nonTaxableWage = 1903.98;
    const range1Min = 1903.99;
    const range1Max = 2826.65;
    const range2Min = 2826.66;
    const range2Max = 3751.05;
    const range3Min = 3751.06;
    const range3Max = 4664.68;
    const range4Min = 4664.69;
    const range1Deduction = 142.80;
    const range2Deduction = 354.80;
    const range3Deduction = 636.13;
    const range4Deduction = 869.36;
    const range1Percent = 7.5;
    const range2Percent = 15;
    const range3Percent = 22.5;
    const range4Percent = 27.5;

    if (wage <= nonTaxableWage) {
      this.companyInfo.irpfTax = 0;
    }
    if (isWithinRange1()) {
      this.companyInfo.irpfTax = Math.round((wage * (range1Percent / 100)) - range1Deduction);
    }

    if (isWithinRange2()) {
      this.companyInfo.irpfTax = Math.round((wage * (range2Percent / 100)) - range2Deduction);
    }

    if (isWithinRange3()) {
      this.companyInfo.irpfTax = Math.round((wage * (range3Percent / 100)) - range3Deduction);
    }

    if (isWithinRange4()) {
      this.companyInfo.irpfTax = Math.round((wage * (range4Percent / 100)) - range4Deduction);
    }

    function isWithinRange1() {
      return wage >= range1Min && wage <= range1Max;
    }
    function isWithinRange2() {
      return wage >= range2Min && wage <= range2Max;
    }
    function isWithinRange3() {
      return wage >= range3Min && wage <= range3Max;
    }
    function isWithinRange4() {
      return wage >= range4Min;
    }
  }

  // Calcula o Total de Impostos a Pagar
  calculateTotalTaxesToPay() {
    this.companyInfo.totalTaxes = this.companyInfo.inssTax + this.companyInfo.irpfTax + this.companyInfo.companyProfitTax;
  }
  //Calcula quanto a empresa irá lucrar após pagar impostos
  calculateCompanyProfit() {
    this.companyInfo.totalProfit = this.companyInfo.profitBeforeTax - this.companyInfo.totalTaxes;
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
