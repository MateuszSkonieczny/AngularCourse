import { Injectable, signal } from "@angular/core";
import type { InvestmentInput, InvestmentResult } from "./investment.model";

@Injectable({ providedIn: 'root' })
export class InvestmentService{
    public annualData = signal<InvestmentResult[] | undefined>(undefined);

    public calculateInvestmentResults(investment: InvestmentInput) {
      const annualData: InvestmentResult[] = [];
      let investmentValue = investment.initialInvestment;
    
      for (let i = 0; i < investment.duration; i++) {
        const year = i + 1;
        const interestEarnedInYear = investmentValue * (investment.expectedReturn / 100);
        investmentValue += interestEarnedInYear + investment.annualInvestment;
        const totalInterest =
          investmentValue - investment.annualInvestment * year - investment.initialInvestment;

          annualData.push({
          year: i+ 1,
          interest: interestEarnedInYear,
          valueEndOfYear: investmentValue,
          annualInvestment: investment.annualInvestment,
          totalInterest: totalInterest,
          totalAmountInvested: investment.initialInvestment + investment.annualInvestment * year,
        });
      }

      this.annualData.set(annualData);
  }

  public getAnnualData(){
    return this.annualData;
  }
}
