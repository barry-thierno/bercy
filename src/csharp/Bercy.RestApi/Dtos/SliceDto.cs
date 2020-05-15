namespace Bercy.RestApi.Dtos
{
    /// <summary>
    /// Slice definition
    /// </summary>
    public class SliceDto
    {
        /// <summary>
        /// Gets or sets the slice low boundary
        /// </summary>
        public int Low { get; set; }

        /// <summary>
        /// Gets or sets the slice high boundary
        /// </summary>
        public int High { get; set; }

        /// <summary>
        /// Gets or sets the slice rate
        /// </summary>
        public double Rate { get; set; }
    }
}
