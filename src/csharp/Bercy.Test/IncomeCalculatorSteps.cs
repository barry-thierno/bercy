namespace Bercy.Test
{
    using Bercy.Shares;
    using Bercy.Slices;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using TechTalk.SpecFlow;

    [Binding]
    public class IncomeCalculatorSteps
    {
        private readonly TaxHouseholdComposition taxHouseholdComposition;
        private readonly ISliceByYearProvider sliceByYearProvider = new SliceByYearProvider();
        private readonly IShareComputer shareComputer = new ShareComputer();

        private Tax computedTax;
        private double wage;

        public IncomeCalculatorSteps(TaxHouseholdComposition taxHouseholdComposition)
        {
            this.taxHouseholdComposition = taxHouseholdComposition;
        }

        [Given(@"Pour l'année (.*), il existe une tranche de (.*) € à (.*) € avec un taux d'imposition de (.*) %")]
        public void GivenIlExisteUneTrancheDeAAvecUnTauxDImpositionDe(int year, int sliceLow, int sliceHigh, double rate)
        {
            var slice = new Slice
            {
                Low = sliceLow,
                High = sliceHigh,
                Rate = rate
            };

            this.sliceByYearProvider.AddSlice(year, slice);
        }

        [Given(@"Mon salaire annuel est de (.*) €")]
        public void GivenMonSalaireAnnuelEstDe(int givenWage)
        {
            this.wage = givenWage;
        }

        [When(@"Je veux connaitre ma TMI et mon imposition pour l'année (.*)")]
        public void WhenJeVeuxConnaitreMaTMIEtMonImposition(int year)
        {
            var irCalculator = new IRCalculator(this.sliceByYearProvider, this.shareComputer);

            var taxComputationRequest = new TaxComputationRequest
            {
                Wage = wage,
                Year = year,
                TaxHouseholdComposition = this.taxHouseholdComposition
            };

            this.computedTax = irCalculator.Compute(taxComputationRequest);
        }

        [Then(@"Ma TMI est de (.*) %")]
        public void ThenMaTMIEstDe(double expectedTmi)
        {
            Assert.AreEqual(expectedTmi, this.computedTax.MarginalTaxRate);
        }

        [Then(@"Mon imposition est de (.*) €")]
        public void ThenMonImpositionEstDe(double expectedTaxAmount)
        {
            Assert.AreEqual(expectedTaxAmount, this.computedTax.Amount);
        }

    }
}
