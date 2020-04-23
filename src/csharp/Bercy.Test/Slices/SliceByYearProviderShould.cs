namespace Bercy.Test.Slices
{
    using System;
    using System.Linq;
    using Bercy.Slices;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class SliceByYearProviderShould
    {
        [TestMethod]
        public void ContainOneSlice_When_EmptyAndAddingOneSlice()
        {
            // Arrange
            var subject = this.BuildSubject();
            var oneSlice = new Slice
            {
                High = 20,
                Low = 10,
                Rate = 15.2
            };

            // Act
            subject.AddSlice(1, oneSlice);
            var savedSlices = subject.GetSlicesForYear(1);

            // Assert
            Assert.AreEqual(1, savedSlices.Count());
            var theSavedSlice = savedSlices.ElementAt(0);
            Assert.AreEqual(oneSlice, theSavedSlice);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void NotAcceptNullSlice_When_TyingToAddNullSlice()
        {
            // Arrange
            var subject = this.BuildSubject();

            // Act
            subject.AddSlice(1, null);
            

            // Assert
            Assert.Fail("Should have thrown ArgumentNullException");
        }

        private SliceByYearProvider BuildSubject()
        {
            return new SliceByYearProvider();
        }
    }
}
