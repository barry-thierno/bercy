namespace Bercy.Test
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using TechTalk.SpecFlow;

    [Binding]
    public class IncomeCalculatorSteps
    {
        private readonly ISliceProvider sliceProvider = new SliceProvider();
        private Tax computedTax;
        private double wage;
        private double share = 1;

        [Given(@"Il existe une tranche de (.*) € à (.*) € avec un taux d'imposition de (.*) %")]
        public void GivenIlExisteUneTrancheDeAAvecUnTauxDImpositionDe(int sliceLow, int sliceHigh, double rate)
        {
            var slice = new Slice
            {
                Low = sliceLow,
                High = sliceHigh,
                Rate = rate
            };

            this.sliceProvider.AddSlice(slice);
        }

        [Given(@"J'ai (.*) parts")]
        public void GivenJaixParts(double givenShare)
        {
            this.share = givenShare;
        }

        [Given(@"Mon salaire annuel est de (.*) €")]
        public void GivenMonSalaireAnnuelEstDe(int givenWage)
        {
            this.wage = givenWage;
        }

        [When(@"Je veux connaitre ma TMI et mon imposition")]
        public void WhenJeVeuxConnaitreMaTMIEtMonImposition()
        {
            var irCalculator = new IRCalculator(this.sliceProvider);
            computedTax = irCalculator.Compute(wage, share);
        }

        [Then(@"Ma TMI est de (.*) %")]
        public void ThenMaTMIEstDe(double expectedTmi)
        {
            Assert.AreEqual(expectedTmi, computedTax.MarginalTaxRate);
        }

        [Then(@"Mon imposition est de (.*) €")]
        public void ThenMonImpositionEstDe(double expectedTaxAmount)
        {
            Assert.AreEqual(expectedTaxAmount, computedTax.Amount);
        }

    }
}
