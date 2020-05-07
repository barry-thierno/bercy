Feature: FamilyQuotientTaxChooser
	In order to choose the appropriate tax amount
	As a tax chooser
	I want to be told the right tax amount to be paid

Scenario: Le montant le plus grand est choisi
	Given J'ai les taxes suivantes
	| Name | Montant |
	| A    | 1500    |
	| B    | 2500    |
	When Je choisi le montant de taxe approprié
	Then La taxe B est choisie


Scenario: L'unique montant est choisi
	Given J'ai les taxes suivantes
	| Name | Montant |
	| A    | 1500    |
	When Je choisi le montant de taxe approprié
	Then La taxe A est choisie