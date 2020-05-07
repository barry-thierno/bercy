namespace Bercy
{
    using System.Collections.Generic;
    using FamilyQuotient;
    using TaxComputer;

    public class IRCalculator
    {
        private readonly ITaxComputer familyQuotientTaxComputer;
        private readonly ITaxComputer classicTaxComputer;
        private readonly IFamilyQuotientTaxChooser familyQuotientTaxChooser;

        public IRCalculator(
            ITaxComputer familyQuotientTaxComputer,
            ITaxComputer classicTaxComputer,
            IFamilyQuotientTaxChooser familyQuotientTaxChooser)
        {
            this.familyQuotientTaxComputer = familyQuotientTaxComputer;
            this.classicTaxComputer = classicTaxComputer;
            this.familyQuotientTaxChooser = familyQuotientTaxChooser;
        }

        public Tax Compute(TaxComputationRequest taxComputationRequest)
        {
            var taxWithNoFamilyQuotient = this.ComputeTaxWithoutFamilyQuotient(taxComputationRequest);

            var taxWithFamilyQuotient = this.ComputeTaxWithFamilyQuotient(taxComputationRequest);

            var mostAppropriateTax = this.ChooseMostAppropriate(taxWithNoFamilyQuotient, taxWithFamilyQuotient);

            return mostAppropriateTax;
        }

        private Tax ChooseMostAppropriate(Tax taxWithNoFamilyQuotient, Tax taxWithFamilyQuotient)
        {
            var taxes = new List<Tax>
            {
                taxWithNoFamilyQuotient,
                taxWithFamilyQuotient
            };

            return this.familyQuotientTaxChooser.Choose(taxes);
        }

        private Tax ComputeTaxWithFamilyQuotient(TaxComputationRequest taxComputationRequest)
        {
            return familyQuotientTaxComputer.Compute(taxComputationRequest);
        }

        private Tax ComputeTaxWithoutFamilyQuotient(TaxComputationRequest taxComputationRequest)
        {
            return this.classicTaxComputer.Compute(taxComputationRequest);
        }
    }
}
