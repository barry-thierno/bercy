namespace Bercy.RestApi.Dtos
{
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// The household composition definition
    /// </summary>
    public class TaxHouseholdCompositionDto
    {
        /// <summary>
        /// Gets or sets the count of adults in the household
        /// </summary>
        [Range(1, 2)]
        public int NbAdults { get; set; }

        /// <summary>
        /// Gets or sets the count of children in the household
        /// </summary>
        [Range(0, 100)]
        public int NbChildren { get; set; }
    }
}
