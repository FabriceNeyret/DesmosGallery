# DesmosGallery
An html gallery export button for www.desmos.com using TamperMonkey / GreaseMonkey / etc.
Creates and saves an html file to be installed wherever you wish, and opens it as well in a new browser tab ( for verification, save or copy-paste as any web content, or just to let you admire your production at a glance :-) ).

Example of result:

<img src="https://i.imgur.com/rPj3BbD.png" height="400"/> 


# Usage
Navigate to the main calculator page of Desmos.com, wait for the button "Get Gallery" to appear in the top-right corner of the page. If it is disabled, you should just need to update the view e.g. by dragging it a bit with the mouse. Click on the button to save the gallery as an html file to install wherever you wish, and to display a new tab containing your personnal gallery of graphs ( for verification, save or copy-paste it as any web content, or just to admire :-) ).
Attention: only saves 2D and 3D graphs.

# Installation
Once you have installed TamperMonkey/GreaseMonkey/variant plugin in your favorite browser, then it's as for any script: click on the name.user.js file above, then "raw". Tampermonkey should then directly propose to install the script, otherwise click on your Monkey plugin icon shortcut and manually copy-paste the code as a new script.

## options 
check if(bool) in code
- (default=false): skip draft graphs ( title = Undefined ).
- (default=false): date per graph
- (default=false): backup URL per graph

# Disclaimer
It is my first script ever :-D ( I followed the model of DesmosToSVG ) , tested only on Chrome and Firefox.  I hope all will go well for you as well ! ;-)

# More
Many tricks on the [DesmosGraph unofficial blog](https://desmosgraphunofficial.wordpress.com/) - comprising a list of others plugins and scripts.
