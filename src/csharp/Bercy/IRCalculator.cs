namespace Bercy
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class IRCalculator
    {
        private readonly ISliceProvider sliceProvider;

        private const double DeductionRate = 10;

        public IRCalculator(ISliceProvider sliceProvider)
        {
            this.sliceProvider = sliceProvider;
        }

        public Tax Compute(double wage, double share = 1)
        {
            Tax tax = new Tax();

            var taxableWage = wage - (wage*DeductionRate/100);

            var uniqueTaxableWage = taxableWage / share;

            var taxAmount = ComputeTax(uniqueTaxableWage);

            taxAmount = taxAmount * share;

            tax.Amount = taxAmount;
            tax.MarginalTaxRate = ComputeMarginalTaxRate(tax.Amount, wage);

            return tax;
        }

        private double ComputeMarginalTaxRate(double tax, double wage)
        {
            var marginalTaxRate = tax / wage * 100;
            return Math.Round(marginalTaxRate, 2, MidpointRounding.ToZero);
        }

        private double ComputeTax(double wage)
        {
            var slicesRepartition = GetSlicesRepartition(wage);

            return slicesRepartition.Sum(s => s.Amount);
        }

        private IEnumerable<SliceRepartition> GetSlicesRepartition(in double wage)
        {
            var slices = this.sliceProvider.GetAllSlices();

            var remaining = wage;

            var sliceRepartition = new List<SliceRepartition>();

            foreach (var slice in slices)
            {
                var amountForSlice = remaining > (slice.High - slice.Low) ? (slice.High - slice.Low) : remaining;

                sliceRepartition.Add(
                    new SliceRepartition
                    {
                        Amount = Math.Round(amountForSlice * slice.Rate / 100),
                        Slice = slice
                    });
                remaining = remaining - amountForSlice;
            }

            return sliceRepartition;
        }
    }

    public class Slice
    {
        public int Low { get; set; }
        public int High { get; set; }
        public double Rate { get; set; }
    }

    public class SliceRepartition
    {
        public Slice Slice { get; set; }
        public double Amount { get; set; }
    }
}
