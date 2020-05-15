namespace Bercy.RestApi.Dtos
{
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// The tax computation request definition
    /// </summary>
    public class TaxComputationRequestDto
    {
        /// <summary>
        /// The sum of household wages
        /// <example>50000</example>
        /// </summary>
        [Range(0, double.MaxValue)]
        public double Wage { get; set; }

        /// <summary>
        /// The year you want to get the tax computation
        /// </summary>
        [Range(0, int.MaxValue)]
        public int Year { get; set; }

        /// <summary>
        /// The household composition
        /// </summary>
        [Required]
        public TaxHouseholdCompositionDto TaxHouseholdComposition { get; set; }
    }
}
