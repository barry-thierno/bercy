namespace Bercy.Test
{
    using Bercy.FamilyQuotient;
    using Bercy.Shares;
    using Bercy.Slices;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using TaxComputer;
    using TechTalk.SpecFlow;

    [Binding]
    public class IncomeCalculatorSteps
    {
        private readonly TaxHouseholdComposition taxHouseholdComposition;
        private readonly ISliceByYearProvider sliceByYearProvider = new SliceByYearProvider();
        private readonly IShareComputer shareComputer = new ShareComputer();
        private readonly IFamilyQuotientTaxChooser familyQuotientTaxChooser = new FamilyQuotientTaxChooser();
        private readonly IFamilyQuotientByYearProvider familyQuotientByYearProvider = new FamilyQuotientByYearProvider();

        private readonly IFamilyQuotientTaxComputer familyQuotienTaxComputer;
        private readonly IClassicTaxComputer classicTaxComputer;

        private Tax computedTax;
        private double wage;

        public IncomeCalculatorSteps(TaxHouseholdComposition taxHouseholdComposition)
        {
            this.taxHouseholdComposition = taxHouseholdComposition;

            this.familyQuotienTaxComputer = new FamilyQuotientTaxComputer(this.shareComputer, this.sliceByYearProvider, this.familyQuotientByYearProvider);
            this.classicTaxComputer = new ClassicTaxComputer(this.shareComputer, this.sliceByYearProvider);
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

        [Given(@"Pour l'année (.*), le Quotient familial est de (.*) €")]
        public void GivenPourLanneeXLeQuotientFamilialEstDeY(int year, double familyQuotient)
        {
            this.familyQuotientByYearProvider.AddFamilyQuotient(year, familyQuotient);
        }

        [Given(@"Mon salaire annuel est de (.*) €")]
        public void GivenMonSalaireAnnuelEstDe(int givenWage)
        {
            this.wage = givenWage;
        }

        [When(@"Je veux connaitre ma TMI et mon imposition pour l'année (.*)")]
        public void WhenJeVeuxConnaitreMaTMIEtMonImposition(int year)
        {
            var irCalculator = new IRCalculator(this.familyQuotienTaxComputer, this.classicTaxComputer, this.familyQuotientTaxChooser);

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
