namespace Bercy.RestApi.Dtos
{
    /// <summary>
    /// The tax dto definition
    /// </summary>
    public class TaxDto
    {
        /// <summary>
        /// Gets or sets the amount to be paid
        /// </summary>
        public double Amount { get; set; }

        /// <summary>
        /// Gets or sets the marginal tax rate fot this household
        /// 
        /// </summary>
        public double MarginalTaxRate { get; set; }
    }
}
