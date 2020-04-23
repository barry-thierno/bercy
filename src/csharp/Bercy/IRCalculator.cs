namespace Bercy
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Shares;
    using Slices;

    public class IRCalculator
    {
        private readonly ISliceByYearProvider sliceByYearProvider;
        private readonly IShareComputer shareComputer;

        private const double DeductionRate = 10;

        public IRCalculator(ISliceByYearProvider sliceByYearProvider, IShareComputer shareComputer)
        {
            this.sliceByYearProvider = sliceByYearProvider;
            this.shareComputer = shareComputer;
        }

        public Tax Compute(TaxComputationRequest taxComputationRequest)
        {
            Tax tax = new Tax();

            var share = this.shareComputer.Compute(taxComputationRequest.TaxHouseholdComposition);

            var taxableWage = taxComputationRequest.Wage - (taxComputationRequest.Wage* DeductionRate/100);

            var uniqueTaxableWage = taxableWage / share;

            var taxAmount = ComputeTax(uniqueTaxableWage, taxComputationRequest.Year);

            taxAmount = taxAmount * share;

            tax.Amount = Math.Round(taxAmount, 0, MidpointRounding.ToZero);
            tax.MarginalTaxRate = ComputeMarginalTaxRate(tax.Amount, taxComputationRequest.Wage);

            return tax;
        }

        private double ComputeMarginalTaxRate(double tax, double wage)
        {
            var marginalTaxRate = tax / wage * 100;
            return Math.Round(marginalTaxRate, 2, MidpointRounding.ToZero);
        }

        private double ComputeTax(double wage, int year)
        {
            var slicesRepartition = GetSlicesRepartition(wage, year);

            return slicesRepartition.Sum(s => s.Amount);
        }

        private IEnumerable<SliceRepartition> GetSlicesRepartition(in double wage, int year)
        {
            var slices = this.sliceByYearProvider.GetSlicesForYear(year);

            var remaining = wage;

            var sliceRepartition = new List<SliceRepartition>();

            foreach (var slice in slices)
            {
                var amountForSlice = remaining > (slice.High - slice.Low) ? (slice.High - slice.Low) : remaining;

                sliceRepartition.Add(
                    new SliceRepartition
                    {
                        Amount = amountForSlice * slice.Rate / 100,
                        Slice = slice
                    });
                remaining = remaining - amountForSlice;
            }

            return sliceRepartition;
        }
    }
}
