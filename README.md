RequireJS.spec
=======

A work in progress. 

The aim of this project is to make testing large, modular projects written in RequireJS easier. 

To this end RequireJS.spec provides:
* Automatic loading of mock files in tests. When specifying dependencies for a test spec, the unit under test is injected, while all other dependencies are loaded out of a mock folder.

TODO:
* Automatically reload state of module exports (e.g. stub call counters) for every single test.
