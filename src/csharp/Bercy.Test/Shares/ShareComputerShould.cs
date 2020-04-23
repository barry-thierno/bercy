namespace Bercy.Test.Shares
{
    using System;
    using Bercy.Shares;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class ShareComputerShould
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void NotAllowTrouples_When_ComputingShares()
        {
            // Arrange
            var taxHouseHoldComposition = new TaxHouseholdComposition
            {
                NbAdults = 3,
                NbChildren = 0
            };
            var subject = this.BuildSubject();

            // Act
            subject.Compute(taxHouseHoldComposition);

            // Assert
            Assert.Fail("Should have throw an exception");
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void NotAllowLessThanOneAdult_When_ComputingShares()
        {
            // Arrange
            var taxHouseHoldComposition = new TaxHouseholdComposition
            {
                NbAdults = 0,
                NbChildren = 0
            };
            var subject = this.BuildSubject();

            // Act
            subject.Compute(taxHouseHoldComposition);

            // Assert
            Assert.Fail("Should have throw an exception");
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void NotAllowLessThanZeroChildren_When_ComputingShares()
        {
            // Arrange
            var taxHouseHoldComposition = new TaxHouseholdComposition
            {
                NbAdults = 1,
                NbChildren = -3
            };
            var subject = this.BuildSubject();

            // Act
            subject.Compute(taxHouseHoldComposition);

            // Assert
            Assert.Fail("Should have throw an exception");
        }

        private ShareComputer BuildSubject()
        {
            return new ShareComputer();
        }
    }
}
