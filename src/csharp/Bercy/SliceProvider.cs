namespace Bercy
{
    using System.Collections.Generic;

    public class SliceProvider : ISliceProvider
    {
        private readonly List<Slice> slices = new List<Slice>();

        public void AddSlice(Slice slice)
        {
            slices.Add(slice);
        }

        public IEnumerable<Slice> GetAllSlices()
        {
            return slices;
        }
    }
}