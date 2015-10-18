# rideMyBike
Loyola University Chicago - Fall 2015 - COMP424 - Final Project


# To visualize the main page
Since we still do not have a server side application, we've created a simple js function that retrieves bicycles' information (a JSON file) from a specific URL. This help us to visualize how the page really should behave.

The file 'client/assets/scripts/mockup.js' contains the hard-coded target URL. In order to work, the directory 'client/assets/mocks' must be served via HTTP. This could be accomplished by using a simple HTTP server. An example is the python module SimpleHTTPServer (python version < 3). To use it just cd to the desired directory and execute: python -m SimpleHTTPServer 8080
