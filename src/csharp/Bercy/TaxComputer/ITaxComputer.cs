namespace Bercy.TaxComputer
{
    public interface ITaxComputer
    {
        Tax Compute(TaxComputationRequest taxComputationRequest);
    }
}
