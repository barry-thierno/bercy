namespace Bercy.Test
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class IRCalculatorShould
    {
        [TestMethod]
        public void Return5Point55AsTmiAnd1111AsTax_When_AnnualRevenueIs20000()
        {
            // Arrange
            var irCalculator = new IRCalculator(GetSliceProvider());

            // Act
            var tax = irCalculator.Compute(20000);

            // Assert
            Assert.AreEqual(5.55, tax.MarginalTaxRate);
            Assert.AreEqual(1111, tax.Amount);
        }

        [TestMethod]
        public void Return8dot11TmiAnd2514AsTax_When_AnnualRevenueIs31000()
        {
            // Arrange
            var irCalculator = new IRCalculator(GetSliceProvider());

            // Act
            var tax = irCalculator.Compute(31000);

            // Assert
            Assert.AreEqual(8.1, tax.MarginalTaxRate);
            Assert.AreEqual(2514, tax.Amount);
        }

        [TestMethod]
        public void Return12Dot71TmiAnd5214AsTax_When_AnnualRevenueIs41000()
        {
            // Arrange
            var irCalculator = new IRCalculator(GetSliceProvider());

            // Act
            var tax = irCalculator.Compute(41000);

            // Assert
            Assert.AreEqual(12.71, tax.MarginalTaxRate);
            Assert.AreEqual(5214, tax.Amount);
        }

        [TestMethod]
        public void RomeoAndJuliette()
        {
            // Arrange
            var irCalculator = new IRCalculator(GetSliceProvider());

            // Act
            var tax = irCalculator.Compute(61000, 2);

            // Assert
            Assert.AreEqual(7.98, tax.MarginalTaxRate);
            Assert.AreEqual(4868, tax.Amount);
        }

        private ISliceProvider GetSliceProvider()
        {
            var sliceProvider = new SliceProvider();

            sliceProvider.AddSlice(new Slice
            {
                Low = 0,
                High = 10064,
                Rate = 0
            });
            sliceProvider.AddSlice(new Slice
            {
                Low = 10065,
                High = 27794,
                Rate = 14
            });
            sliceProvider.AddSlice(new Slice
            {
                Low = 27795,
                High = 74517,
                Rate = 30
            });

            return sliceProvider;
        }
    }

    
}
