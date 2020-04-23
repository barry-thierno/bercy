Feature: IncomeCalculator
	In order to know my fiscal situation
	As a contribuable
	I want to be told what I'll pay

Background: 
	Given Pour l'année 2019, il existe une tranche de 0 € à 10064 € avec un taux d'imposition de 0 %
	Given Pour l'année 2019, il existe une tranche de 10065 € à 27794 € avec un taux d'imposition de 14 %
	Given Pour l'année 2019, il existe une tranche de 27795 € à 74517 € avec un taux d'imposition de 30 %

	Given Pour l'année 2020, il existe une tranche de 0 € à 10064 € avec un taux d'imposition de 0 %
	Given Pour l'année 2020, il existe une tranche de 10065 € à 25659 € avec un taux d'imposition de 11 %
	Given Pour l'année 2020, il existe une tranche de 25660 € à 73339 € avec un taux d'imposition de 30 %

Scenario: Juliette 2019
	Given Mon salaire annuel est de 20000 €
	And Je suis célibataire
	When Je veux connaitre ma TMI et mon imposition pour l'année 2019
	Then Ma TMI est de 5.55 %
	And Mon imposition est de 1111 €

Scenario: Romeo 2019
	Given Mon salaire annuel est de 31000 €
	And Je suis célibataire
	When Je veux connaitre ma TMI et mon imposition pour l'année 2019
	Then Ma TMI est de 8.1 %
	And Mon imposition est de 2514 €

Scenario: Romeo prime 2019
	Given Mon salaire annuel est de 41000 €
	And Je suis célibataire
	When Je veux connaitre ma TMI et mon imposition pour l'année 2019
	Then Ma TMI est de 12.71 %
	And Mon imposition est de 5214 €

Scenario: Romeo et Juliette 2019
	Given Mon salaire annuel est de 61000 €
	And Je suis en couple
	When Je veux connaitre ma TMI et mon imposition pour l'année 2019
	Then Ma TMI est de 7.98 %
	And Mon imposition est de 4868 €

Scenario: Juliette 2020
	Given Mon salaire annuel est de 20000 €
	And Je suis célibataire
	When Je veux connaitre ma TMI et mon imposition pour l'année 2020
	Then Mon imposition est de 872 €

Scenario: Romeo prime 2020
	Given Mon salaire annuel est de 41000 €
	And Je suis célibataire
	When Je veux connaitre ma TMI et mon imposition pour l'année 2020
	Then Mon imposition est de 5087 €

Scenario: Romeo et Juliette 2020
	Given Mon salaire annuel est de 61000 €
	And Je suis en couple
	When Je veux connaitre ma TMI et mon imposition pour l'année 2020
	Then Mon imposition est de 4505 €

Scenario: Romeo, Juliette et enfant 2019
	Given Mon salaire annuel est de 61000 €
	And Je suis en couple
	And J'ai 1 enfant(s)
	When Je veux connaitre ma TMI et mon imposition pour l'année 2019
	Then Mon imposition est de 4163 €