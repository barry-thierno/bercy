namespace Bercy
{
    using System.Collections.Generic;

    public interface ISliceProvider
    {
        void AddSlice(Slice slice);

        IEnumerable<Slice> GetAllSlices();
    }
}