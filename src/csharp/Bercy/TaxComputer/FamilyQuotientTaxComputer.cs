namespace Bercy.TaxComputer
{
    using FamilyQuotient;
    using Shares;
    using Slices;

    public class FamilyQuotientTaxComputer : TaxComputerBase, IFamilyQuotientTaxComputer
    {
        private readonly IFamilyQuotientByYearProvider familyQuotientByYearProvider;

        public FamilyQuotientTaxComputer(
            IShareComputer shareComputer,
            ISliceByYearProvider sliceByYearProvider,
            IFamilyQuotientByYearProvider familyQuotientByYearProvider)
            : base(shareComputer, sliceByYearProvider)
        {
            this.familyQuotientByYearProvider = familyQuotientByYearProvider;
        }

        protected override double GetNbShare(TaxComputationRequest taxComputationRequest)
        {
            return taxComputationRequest.TaxHouseholdComposition.NbAdults;
        }

        protected override double GetAmountToDeduce(TaxComputationRequest taxComputationRequest)
        {
            var familyQuotient = this.familyQuotientByYearProvider.GetFamilyQuotientForYear(taxComputationRequest.Year);

            return familyQuotient * taxComputationRequest.TaxHouseholdComposition.NbChildren;
        }
    }
}
