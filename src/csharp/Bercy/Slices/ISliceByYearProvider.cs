namespace Bercy.Slices
{
    using System.Collections.Generic;

    public interface ISliceByYearProvider
    {
        void AddSlice(int year, Slice slice);
        IEnumerable<Slice> GetSlicesForYear(int year);
    }
}
