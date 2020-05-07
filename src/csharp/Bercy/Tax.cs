namespace Bercy
{
    public class Tax
    {
        public double Amount { get; set; }
        public double MarginalTaxRate { get; set; }

        public static Tax Empty => new Tax();
    }
}
