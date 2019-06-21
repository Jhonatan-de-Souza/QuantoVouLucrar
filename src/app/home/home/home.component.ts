import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit {
  faturamentoPreImposto;
  impostoEmpresaAPagar;
  percentualImposto;
  percentualProLabore;
  inssAPagar;
  irpfAPagar;
  totalAPagar;
  quantoVouLucrar;
  salarioProLabore = 0;
  isItemVisible = false;

  constructor(private page: Page) { }
  
  ngOnInit() {
    this.page.actionBarHidden = true;
  }
  calcularImpostos() {
    this.exibirResultados();
    this.calcularImpostosSobFaturamento();
    this.calcularInss();
    this.calcularInrf();
    this.calcularTotalImpostosAPagar();
    this.calcularLucroEmpresa();
  }
  exibirResultados() {
    this.isItemVisible = true;
  }
  calcularImpostosSobFaturamento() {
    this.impostoEmpresaAPagar = this.faturamentoPreImposto * (this.percentualImposto / 100);
  }
  // Calcula INSS - Previdência Social
  calcularInss() {
    const percentualInssSobreSalario = 0.11;
    this.salarioProLabore = this.faturamentoPreImposto * (this.percentualProLabore / 100);
    this.inssAPagar = Math.round(this.salarioProLabore * percentualInssSobreSalario)
  }

  //Calcular Imposto de Renda Pessoa Física
  calcularInrf() {
    const salarioLiquido = this.salarioProLabore - this.inssAPagar;
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
      this.irpfAPagar = 0;
    }
    if (enquadraFaixa1()) {
      this.irpfAPagar = Math.round((salarioLiquido * (percentualFaixa1 / 100)) - deducaoFaixa1);
    }

    if (enquadraFaixa2()) {
      this.irpfAPagar = Math.round((salarioLiquido * (percentualFaixa2 / 100)) - deducaoFaixa2);
    }

    if (enquadraFaixa3()) {
      this.irpfAPagar = Math.round((salarioLiquido * (percentualFaixa3 / 100)) - deducaoFaixa3);
    }

    if (enquadraFaixa4()) {
      this.irpfAPagar = Math.round((salarioLiquido * (percentualFaixa4 / 100)) - deducaoFaixa4);
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
  }

  // Calcula o Total de Impostos a Pagar
  calcularTotalImpostosAPagar() {
    this.totalAPagar = this.inssAPagar + this.irpfAPagar + this.impostoEmpresaAPagar;
  }
  //Calcula quanto a empresa irá lucrar após pagar impostos
  calcularLucroEmpresa() {
    this.quantoVouLucrar = this.faturamentoPreImposto - this.totalAPagar;
  }
}
