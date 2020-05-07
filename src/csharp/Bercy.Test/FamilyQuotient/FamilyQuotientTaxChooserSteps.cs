namespace Bercy.Test.FamilyQuotient
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using Bercy.FamilyQuotient;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using TechTalk.SpecFlow;
    using TechTalk.SpecFlow.Assist;

    [Binding]
    public class FamilyQuotientTaxChooserSteps
    {
        private IDictionary<string, Tax> inputTaxes = null;
        private Tax computedTax = null;

        [Given(@"J'ai les taxes suivantes")]
        public void GivenJAiLesTaxesSuivantes(Table taxTable)
        {
            this.inputTaxes = new Dictionary<string, Tax>();

            foreach (var oneTax in taxTable.CreateSet<(string name, double amount)>())
            {
                this.inputTaxes.Add(oneTax.name, new Tax {Amount = oneTax.amount});
            }
        }

        [When(@"Je choisi le montant de taxe approprié")]
        public void GivenJeChoisiLeMontantDeTaxeApproprie()
        {
            var subject = this.BuildFamilyQuotientTaxChooser();
            
            this.computedTax = subject.Choose(inputTaxes.Values.ToList());
        }

        [Then(@"La taxe (.*) est choisie")]
        public void ThenLaTaxeXEstChoisie(string taxName)
        {
            var expectedTaxAmount = this.inputTaxes[taxName].Amount;

            Assert.AreEqual(expectedTaxAmount, this.computedTax.Amount);
        }

        private FamilyQuotientTaxChooser BuildFamilyQuotientTaxChooser()
        {
            return new FamilyQuotientTaxChooser();
        }
    }
}
