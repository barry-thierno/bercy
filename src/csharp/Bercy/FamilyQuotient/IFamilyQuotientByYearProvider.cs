namespace Bercy.FamilyQuotient
{
    public interface IFamilyQuotientByYearProvider
    {
        void AddFamilyQuotient(int year, double familyQuotient);
        double GetFamilyQuotientForYear(int year);
    }
}
