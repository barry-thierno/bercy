namespace Bercy.TaxComputer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Shares;
    using Slices;

    public abstract class TaxComputerBase : ITaxComputer
    {
        private readonly IShareComputer shareComputer;
        private readonly ISliceByYearProvider sliceByYearProvider;

        private const double DeductionRate = 10;

        public TaxComputerBase(IShareComputer shareComputer, ISliceByYearProvider sliceByYearProvider)
        {
            this.shareComputer = shareComputer;
            this.sliceByYearProvider = sliceByYearProvider;
        }

        public Tax Compute(TaxComputationRequest taxComputationRequest)
        {
            Tax tax = new Tax();

            var share = GetNbShare(taxComputationRequest);

            var taxableWage = taxComputationRequest.Wage - (taxComputationRequest.Wage * DeductionRate / 100);

            var uniqueTaxableWage = taxableWage / share;

            var taxAmount = ComputeTax(uniqueTaxableWage, taxComputationRequest.Year);

            taxAmount = taxAmount * share;
            taxAmount = taxAmount - GetAmountToDeduce(taxComputationRequest);

            tax.Amount = Math.Round(taxAmount, 0, MidpointRounding.ToZero);
            tax.MarginalTaxRate = ComputeMarginalTaxRate(tax.Amount, taxComputationRequest.Wage);

            return tax;
        }

        protected abstract double GetNbShare(TaxComputationRequest taxComputationRequest);
        protected abstract double GetAmountToDeduce(TaxComputationRequest taxComputationRequest);

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
