namespace Bercy.Test
{
    using TechTalk.SpecFlow;

    [Binding]
    public class CommonSteps
    {
        private readonly TaxHouseholdComposition taxHouseholdComposition;

        public CommonSteps(TaxHouseholdComposition taxHouseholdComposition)
        {
            this.taxHouseholdComposition = taxHouseholdComposition;
        }

        [Given(@"Je suis célibataire")]
        public void GivenJeSuisCelibataire()
        {
            this.taxHouseholdComposition.NbAdults = 1;
        }

        [Given(@"Je suis en couple")]
        public void GivenJeSuisEnCouple()
        {
            this.taxHouseholdComposition.NbAdults = 2;
        }
    }
}
