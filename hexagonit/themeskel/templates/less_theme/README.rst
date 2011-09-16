Introduction
============

A plone.app.theming theme based on HTML5 Boilerplate and Less Css, designed to
be the starting point for rapid theme development.


Package content
================

  * browser
  * docs
  * locales
  * profiles
  * tests
  * theme_resources
    * css - holds the generated css that is actually used by plone
    * javascript - holds all the javascripts used by the theme
    * less - holds all the less files that will produce the css
        * plone - plone default styles that is converted to less
        * theme - theme specific less files
        * style.less - HTML5Boilerplate css file that includes the plone and 
        theme specific less files
    * index.html - main template used by plone.app.theming
    * rules.xml - rules file used by plone.app.theming


HTML 5 Boilerplate
==================

The main template that we are using is based on the index.html file from 
HTML 5 Boilerplate.

The same goes for our finally generated css file.


Less Css
========

We are using lesscss.org for producing the final css that is used by Plone.
This means that less is only used in the development process, and the less files
are compiled before they are used by Plone. We are using Less.app for the
compiling and it needs to be set up so the output of style.less is to our css
folder. 

Setting up less.app
-------------------

Add the less folder from theme_resources to Less.app. Select /style.less and 
set it's CSS Output Path to point to theme_resources/css. The rest of the files
will be included in style.less, so we don't need the compiled versions of them.
Without setting anything Less.app will put the compiled file to the same place
where the source is, so if you don't want it to end up in the same folder, just 
create a new folder and set it to be the output location for rest of the files.
These files are not used anywhere, so you can freely delete them.

Structure of less folder
------------------------

The less folder holds all the css needed by Plone, so there is no need for
additional css. We have disabled all the css that we don't need in
profiles/default/cssregistry.xml

The plone folder holds all the styles that are needed by Plone to function, so 
this folder should not be touched. 
The basic idea is to take the Plone's default css files and "lessify" them. 
For fast development, we need a quick way to change the default colors to 
reflect the design we are implementing, so we have modified the files so they 
use variables that are set in one location. This is something that we have seen
before in form of base_properties.props, but this time we are doing it with
less variables.

All the theme specific styles goes into theme folder. This folder includes the 
base.less and mixins.less that holds all the variables and mixins that are used
by the styles in the plone folder.

The theme specific styling should go to template.less. If you would like to have
multiple files for your theme, just create a new .less file and include it to
init.less. All the less files are imported to the init.less files in their 
folders, which then get imported to style.less. This way we can concentrate only
on our theme and there is no need to modify core Plone styles. If you do want to
change some styling that is not in base.less, but somewhere in the plone folder
or in style.less, just redefine it in your themplate.less. This way upgrade of 
the core styles can be done easily without loosing theme specific styling.

HTML5Boilerplate suggests to have all plugins in plugins.js and all user scripts
in script.js. We have decided to go against it, and we are using Plone's 
default javascript registry. The final result is the same, as Plone does merge
and minimize all the registered javascripts.


Note: Lessification of plone/public.less is not finished yet, so there still
might be some styles that are not converted to variables and included in 
base.less.


Plone.app.theming
=================

index.html is the main template that we use, so to have a custom layout, you'll
need to modify this file. The header tag holds the header of the site, the div 
with id="visual-portal-wrapper" should hold the body region, and the footer tag
should hold the footer.

Some selectors in Plone rely on having the visual-portal-wrapper id present, so
we have just included an additional wrapper div within the main div.

rules.xml is the rules file, and we have set up the copying of the css and 
javascripts to proper location within the index.html, and it also includes rules
that copy everything from Plone and put it into proper place. Feel free to 
modify this to suite your needs. Boilerplate encourages us to have the styles 
and javascript inclusions in specific place, so please don't modify the rules 
that make this happen.


Exceptions
----------

Modernizer.js should be the only JS in the header, so it’s hard to have a rule 
that will put it there, so we have put only this js in the index.html and it is 
not served from plone’s js registry. In case if the site is loaded without the 
Diazo theme, the modernizer.js will be provided by Plone.

Mobile.css is not modified, and we are using Plone’s default files 
because they need to have the media attribute set, and in less there is no way 
to do the same thing as the media attribute does.


Useful reads
============

LESS CSS Shapes Library
https://github.com/NathanStrutz/LESS-CSS-Shapes-Library 

Lessins - collection of useful mixins
http://code.google.com/p/lessins/



