import { Component, computed, inject, input, Input, signal } from '@angular/core';
import type { InvestmentInput, InvestmentResult } from '../investment.model';
import { InvestmentService } from '../investment.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {

  private investmentService = inject(InvestmentService);

  get getAnnualData(){
    return this.investmentService.getAnnualData();
  }

  annualData = computed(() => this.investmentService.annualData());
}
