VAR reputation = 0

-> start
=== start ===
You are in the square.

* [Talk to the guard]
    -> guard_dialogue ->
    You return to the square.
    -> start
    You don't see this line because you are sent back to the city before.

* {reputation >= 1} [Ask for a favor]
    The guard helps you.
    -> END

=== guard_dialogue ===
The guard looks at you.

* [Greet]
    "Hello citizen."
    ~ reputation += 1
->->

* [Insult]
    "Hey you!"
    ~ reputation -= 1

->->
