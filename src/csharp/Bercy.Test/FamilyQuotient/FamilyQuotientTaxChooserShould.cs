namespace Bercy.Test.FamilyQuotient
{
    using System;
    using System.Collections.Generic;
    using Bercy.FamilyQuotient;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class FamilyQuotientTaxChooserShould
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void NotAcceptNullInput_When_InputIsGivenAsNull()
        {
            // Arrange
            var subject = this.BuildSubject();

            // Act & Assert
            subject.Choose(null);
        }

        [TestMethod]
        public void ChooseNoTax_When_InputIsGivenAsEmpty()
        {
            // Arrange
            var subject = this.BuildSubject();

            // Act
            var tax = subject.Choose(new List<Tax>());

            // Assert
            Assert.IsNotNull(tax);
            Assert.AreEqual(Tax.Empty.Amount, tax.Amount);
        }

        private FamilyQuotientTaxChooser BuildSubject()
        {
            return new FamilyQuotientTaxChooser();
        }
    }
}
