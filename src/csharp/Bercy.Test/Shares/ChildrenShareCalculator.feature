Feature: ChildrenShareCalculator
	In order to know the composition of my foyer
	As a contribuable
	I want to be told my number of shares

Scenario: Célibataire sans enfant
	Given Je suis célibataire
	And J'ai 0 enfant(s)
	When Je veux savoir combien j'ai de part dans mon foyer fiscal
	Then J'ai 1 part(s)

Scenario: Couple sans enfant
	Given Je suis en couple
	And J'ai 0 enfant(s)
	When Je veux savoir combien j'ai de part dans mon foyer fiscal
	Then J'ai 2 part(s)

Scenario: Célibataire avec 1 enfant
	Given Je suis célibataire
	And J'ai 1 enfant(s)
	When Je veux savoir combien j'ai de part dans mon foyer fiscal
	Then J'ai 1.5 part(s)
	
Scenario: Couple avec 1 enfant
	Given Je suis en couple
	And J'ai 1 enfant(s)
	When Je veux savoir combien j'ai de part dans mon foyer fiscal
	Then J'ai 2.5 part(s)

Scenario: Couple avec 2 enfants
	Given Je suis en couple
	And J'ai 2 enfant(s)
	When Je veux savoir combien j'ai de part dans mon foyer fiscal
	Then J'ai 3 part(s)

Scenario: Couple avec 3 enfants
	Given Je suis en couple
	And J'ai 3 enfant(s)
	When Je veux savoir combien j'ai de part dans mon foyer fiscal
	Then J'ai 4 part(s)

Scenario: Couple avec 4 enfants
	Given Je suis en couple
	And J'ai 4 enfant(s)
	When Je veux savoir combien j'ai de part dans mon foyer fiscal
	Then J'ai 5 part(s)

Scenario: Célibataire avec 5 enfants
	Given Je suis célibataire
	And J'ai 5 enfant(s)
	When Je veux savoir combien j'ai de part dans mon foyer fiscal
	Then J'ai 5 part(s)