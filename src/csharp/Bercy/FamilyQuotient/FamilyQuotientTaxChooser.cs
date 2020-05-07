namespace Bercy.FamilyQuotient
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class FamilyQuotientTaxChooser : IFamilyQuotientTaxChooser
    {
        public Tax Choose(IEnumerable<Tax> taxes)
        {
            if (taxes == null)
            {
                throw new ArgumentNullException(nameof(taxes));
            }

            IEnumerable<Tax> taxArray = taxes as Tax[] ?? taxes.ToArray();

            if (!taxArray.Any())
            {
                return Tax.Empty;
            }

            return taxArray.OrderByDescending(t => t.Amount).First();
        }
    }
}
