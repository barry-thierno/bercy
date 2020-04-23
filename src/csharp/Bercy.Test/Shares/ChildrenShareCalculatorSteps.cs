namespace Bercy.Test.Shares
{
    using Bercy.Shares;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using TechTalk.SpecFlow;

    [Binding]
    public class ChildrenShareCalculatorSteps
    {
        private readonly TaxHouseholdComposition taxHouseholdComposition;

        public ChildrenShareCalculatorSteps(TaxHouseholdComposition taxHouseholdComposition)
        {
            this.taxHouseholdComposition = taxHouseholdComposition;
        }

        private IShareComputer shareComputer = new ShareComputer();

        private double? nbShareComputed;

        [Given(@"J'ai (.*) enfant\(s\)")]
        public void JaiXEnfant(int nbEnfants)
        {
            this.taxHouseholdComposition.NbChildren = nbEnfants;
        }

        [When(@"Je veux savoir combien j'ai de part dans mon foyer fiscal")]
        public void JeVeuxSavoirCombienJaiDePartsDansMonFoyerFiscal()
        {
            this.nbShareComputed = this.shareComputer.Compute(this.taxHouseholdComposition);
        }

        [Then(@"J'ai (.*) part\(s\)")]
        public void JaiXParts(double expectedNbShare)
        {
            Assert.AreEqual(expectedNbShare, this.nbShareComputed);
        }
    }
}
