Feature: IncomeCalculator
	In order to know my fiscal situation
	As a contribuable
	I want to be told what I'll pay

Background: 
	Given Il existe une tranche de 0 € à 10064 € avec un taux d'imposition de 0 %
	Given Il existe une tranche de 10065 € à 27794 € avec un taux d'imposition de 14 %
	Given Il existe une tranche de 27795 € à 74517 € avec un taux d'imposition de 30 %

Scenario: Juliette
	Given Mon salaire annuel est de 20000 €
	When Je veux connaitre ma TMI et mon imposition
	Then Ma TMI est de 5.55 %
	And Mon imposition est de 1111 €

Scenario: Romeo
	Given Mon salaire annuel est de 31000 €
	When Je veux connaitre ma TMI et mon imposition
	Then Ma TMI est de 8.1 %
	And Mon imposition est de 2514 €

Scenario: Romeo prime
	Given Mon salaire annuel est de 41000 €
	When Je veux connaitre ma TMI et mon imposition
	Then Ma TMI est de 12.71 %
	And Mon imposition est de 5214 €

Scenario: Romeo et Juliette
	Given Mon salaire annuel est de 61000 €
	And J'ai 2 parts
	When Je veux connaitre ma TMI et mon imposition
	Then Ma TMI est de 7.98 %
	And Mon imposition est de 4868 €