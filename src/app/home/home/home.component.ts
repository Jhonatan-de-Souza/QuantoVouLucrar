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

  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
  calcularImpostos() {
    this.calcularImpostosSobFaturamento();
    this.calcularInss();
    this.calcularInrf();
    this.calcularTotalImpostosAPagar();
    this.calcularLucroEmpresa();
  }
  
  calcularImpostosSobFaturamento() {
    //this.impostoEmpresaAPagar = this.faturamentoPreImposto * (this.percentualImposto / 100);
    this.companyInfo.companyProfitTax = this.companyInfo.profitBeforeTax  * (this.companyInfo.companyIncomePercentTax / 100);
  }
  // Calcula INSS - Previdência Social
  calcularInss() {
    //const percentualInssSobreSalario = 0.11;
    const inssTaxOnWage = 0.11; // Percentual Inss sobre Salário
    //this.salarioProLabore = this.faturamentoPreImposto * (this.percentualProLabore / 100);
    this.companyInfo.associateWage = this.companyInfo.profitBeforeTax * (this.companyInfo.associateWagePercent / 100);
    //this.inssAPagar = Math.round(this.salarioProLabore * percentualInssSobreSalario)
    this.companyInfo.inssTax = Math.round(this.companyInfo.associateWage * inssTaxOnWage);
  }

  //Calcular Imposto de Renda Pessoa Física
  calcularInrf() {
    const salarioLiquido = this.companyInfo.associateWage - this.companyInfo.inssTax;
    const valorNaoTributavel = 1903.98;
    const minFaixa1 = 1903.99;
    const maxFaixa1 = 2826.65;
    const minFaixa2 = 2826.66;
    const maxFaixa2 = 3751.05;
    const minFaixa3 = 3751.06;
    const maxFaixa3 = 4664.68;
    const minFaixa4 = 4664.69;
    const deducaoFaixa1 = 142.80;
    const deducaoFaixa2 = 354.80;
    const deducaoFaixa3 = 636.13;
    const deducaoFaixa4 = 869.36;
    const percentualFaixa1 = 7.5;
    const percentualFaixa2 = 15;
    const percentualFaixa3 = 22.5;
    const percentualFaixa4 = 27.5;

    if (salarioLiquido <= valorNaoTributavel) {
      this.companyInfo.irpfTax = 0;
    }
    if (enquadraFaixa1()) {
      this.companyInfo.irpfTax = Math.round((salarioLiquido * (percentualFaixa1 / 100)) - deducaoFaixa1);
    }

    if (enquadraFaixa2()) {
      this.companyInfo.irpfTax = Math.round((salarioLiquido * (percentualFaixa2 / 100)) - deducaoFaixa2);
    }

    if (enquadraFaixa3()) {
      this.companyInfo.irpfTax = Math.round((salarioLiquido * (percentualFaixa3 / 100)) - deducaoFaixa3);
    }

    if (enquadraFaixa4()) {
      this.companyInfo.irpfTax = Math.round((salarioLiquido * (percentualFaixa4 / 100)) - deducaoFaixa4);
    }

    function enquadraFaixa1() {
      return salarioLiquido >= minFaixa1 && salarioLiquido <= maxFaixa1;
    }
    function enquadraFaixa2() {
      return salarioLiquido >= minFaixa2 && salarioLiquido <= maxFaixa2;
    }
    function enquadraFaixa3() {
      return salarioLiquido >= minFaixa3 && salarioLiquido <= maxFaixa3;
    }
    function enquadraFaixa4() {
      return salarioLiquido >= minFaixa4;
    }

    console.log('finalizando  calculo Inrf');
  }

  // Calcula o Total de Impostos a Pagar
  calcularTotalImpostosAPagar() {
    //this.totalAPagar = this.inssAPagar + this.irpfAPagar + this.impostoEmpresaAPagar;
    this.companyInfo.totalTaxes = this.companyInfo.inssTax + this.companyInfo.irpfTax + this.companyInfo.companyProfitTax;
  }
  //Calcula quanto a empresa irá lucrar após pagar impostos
  calcularLucroEmpresa() {
    //this.quantoVouLucrar = this.faturamentoPreImposto - this.totalAPagar;
    this.companyInfo.totalProfit = this.companyInfo.profitBeforeTax - this.companyInfo.totalTaxes;
    //this.quantoVouLucrar = 'R$' + this.quantoVouLucrar;
    this.companyInfo.totalProfit = 'R$' + this.companyInfo.totalProfit;
  }
}
