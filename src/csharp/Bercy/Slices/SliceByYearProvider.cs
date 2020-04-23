namespace Bercy.Slices
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class SliceByYearProvider : ISliceByYearProvider
    {
        private readonly IDictionary<int, IEnumerable<Slice>> slicesByYear = new Dictionary<int, IEnumerable<Slice>>();

        public void AddSlice(int year, Slice slice)
        {
            if (slice == null)
            {
                throw new ArgumentNullException(nameof(slice));
            }

            if (slicesByYear.ContainsKey(year))
            {
                var existingSlices = slicesByYear[year].ToList();
                existingSlices.Add(slice);
                slicesByYear[year] = existingSlices;
            }
            else
            {
                slicesByYear[year] = new List<Slice>
                {
                    slice
                };
            }
        }

        public IEnumerable<Slice> GetSlicesForYear(int year)
        {
            return slicesByYear[year];
        }
    }
}
