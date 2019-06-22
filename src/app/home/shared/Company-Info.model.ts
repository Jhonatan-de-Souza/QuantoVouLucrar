export class CompanyInfo {
    profitBeforeTax; //Tax Pre-Impostos
    companyIncomePercentTax // Taxas por CNAE  - percentualImposto
    companyProfitTax; // Impostos sobre faturamento - impostoEmpresaAPagar
    inssTax; // Taxa INSS
    irpfTax; // Taxa IRPF
    employeeTax; // Taxas Pro-Labore
    associateWage; // Salario Pro Labore do Sócio
    associateWagePercent;  // Percentual Pro-Labore a retirar
    totalTaxes; // Total de impostos a pagar -impostoEmpresaAPagar
    totalProfit; // Lucro Total
}