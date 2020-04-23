namespace Bercy
{
    public class TaxComputationRequest
    {
        public double Wage { get; set; }
        public int Year { get; set; }
        public TaxHouseholdComposition TaxHouseholdComposition { get; set; }
    }
}
