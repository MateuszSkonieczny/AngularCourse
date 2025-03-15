import { Component, computed, inject } from '@angular/core';
import { InvestmentService } from '../investment.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: false,
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
