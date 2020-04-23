namespace Bercy.Shares
{
    using System;
    using System.Collections.Generic;

    public class ShareComputer : IShareComputer
    {
        private static int MinAllowedAdults = 1;
        private static int MaxAllowedAdults = 2;

        private static int MinAllowedChildren = 0;

        private static readonly List<int> NbChildrenConsideredAsHalfShare = new List<int>
        {
            1,
            2
        };

        public double Compute(TaxHouseholdComposition taxHouseholdComposition)
        {
            CheckArguments(taxHouseholdComposition);

            var nbAdultsShares = GetAdultsSubPart(taxHouseholdComposition);

            var nbChildrenShares = GetChildrenSubPart(taxHouseholdComposition);

            return nbAdultsShares + nbChildrenShares;
        }

        private static double GetAdultsSubPart(TaxHouseholdComposition taxHouseholdComposition)
        {
            return taxHouseholdComposition.NbAdults;
        }

        private static double GetChildrenSubPart(TaxHouseholdComposition taxHouseholdComposition)
        {
            double nbShare = 0;

            if (taxHouseholdComposition.NbChildren > 0)
            {
                if (NbChildrenConsideredAsHalfShare.Contains(taxHouseholdComposition.NbChildren))
                {
                    nbShare += (double) taxHouseholdComposition.NbChildren / 2;
                }
                else
                {
                    nbShare += taxHouseholdComposition.NbChildren - 1;
                }
            }

            return nbShare;
        }

        private static void CheckArguments(TaxHouseholdComposition taxHouseholdComposition)
        {
            if (taxHouseholdComposition == null)
            {
                throw new ArgumentNullException(nameof(taxHouseholdComposition));
            }

            if (taxHouseholdComposition.NbAdults < MinAllowedAdults || taxHouseholdComposition.NbAdults > MaxAllowedAdults)
            {
                throw new ArgumentOutOfRangeException(nameof(taxHouseholdComposition.NbAdults));
            }

            if (taxHouseholdComposition.NbChildren < MinAllowedChildren)
            {
                throw new ArgumentOutOfRangeException(nameof(taxHouseholdComposition.NbChildren));
            }
        }
    }
}
