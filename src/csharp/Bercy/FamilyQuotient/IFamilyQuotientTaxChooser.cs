namespace Bercy.FamilyQuotient
{
    using System.Collections.Generic;

    public interface IFamilyQuotientTaxChooser
    {
        Tax Choose(IEnumerable<Tax> taxes);
    }
}
