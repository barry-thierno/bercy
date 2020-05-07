namespace Bercy.FamilyQuotient
{
    using System.Collections.Generic;

    public class FamilyQuotientByYearProvider : IFamilyQuotientByYearProvider
    {
        private IDictionary<int, double> familyQuotientByYear = new Dictionary<int, double>();

        public void AddFamilyQuotient(int year, double familyQuotient)
        {
            this.familyQuotientByYear.Add(year, familyQuotient);
        }

        public double GetFamilyQuotientForYear(int year)
        {
            return this.familyQuotientByYear[year];
        }
    }
}
