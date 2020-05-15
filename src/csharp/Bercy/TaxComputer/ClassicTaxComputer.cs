namespace Bercy.TaxComputer
{
    using Shares;
    using Slices;

    public class ClassicTaxComputer : TaxComputerBase, IClassicTaxComputer
    {
        private readonly IShareComputer shareComputer;

        public ClassicTaxComputer(IShareComputer shareComputer, ISliceByYearProvider sliceByYearProvider)
            : base(shareComputer, sliceByYearProvider)
        {
            this.shareComputer = shareComputer;
        }


        protected override double GetNbShare(TaxComputationRequest taxComputationRequest)
        {
            return this.shareComputer.Compute(taxComputationRequest.TaxHouseholdComposition);
        }

        protected override double GetAmountToDeduce(TaxComputationRequest taxComputationRequest)
        {
            // No amount to deduce in classic formula
            return 0;
        }
    }
}
