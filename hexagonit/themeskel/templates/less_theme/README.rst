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

After each update to the files, Less.app will recompile the edited file, but
it won't recompile all files. In order to update the style.css which Plone is
using, Compile All button must be clicked after editing any file.

Note: Less.app will report some variable undefined errors, but that is normal,
as it can't find the variables that are defined in other files. In the end, all
variables and code are included in style.less, and it is crucial that this file
successfully compile.

Important: If less files are changed in the themeskel itself, compile them, so
in css/style.css we always have the newest code.


Structure of less folder
------------------------

The less folder holds all the css needed by Plone, so there is no need for
additional css. We have disabled all the css that we don't need in
profiles/default/cssregistry.xml

The plone folder holds all the styles that are needed by Plone to function, so 
the content of this folder should not be modified. 
The basic idea is to take the Plone's default css files and "lessify" them. 
For fast development, we need a quick way to change the default colors to 
reflect the design we are implementing, so we have modified the files so they 
use variables that are set in one location. This is something that we have seen
before in form of base_properties.props, but this time we are doing it right
with less variables.

All the theme specific styles go into theme folder. This folder includes the 
base.less and mixins.less that holds all the variables and mixins that are used
by the styles in the plone folder. Modify the values to meet your theme's needs.

The theme specific styling that cannot be set in base.less, should go to 
template.less. If you would like to have multiple files for your theme, just 
create a new .less file and include it to init.less. All the less files are 
imported to the init.less files in their folders, which then get imported to 
style.less. This way we can concentrate only on our theme and there is no need 
to modify core Plone styles. If you do want to change some styling that is not 
in base.less, but somewhere in the plone folder or in style.less, just redefine 
it in your themplate.less. This way upgrade of the core styles can be done 
easily without loosing theme specific styling.

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

Within public.less, there are relative paths to some images, and Diazo will
append the set prefix on them, even though we actually don't want that. One
of the solutions would be to split the CSS files into two groups, the one that
need prefix applied, and ones that don't. Html 5 Boilerplate suggests to have
all the styles in one file, so we decided not to modify the structure, but to
include the missing images in our theme.


Exceptions
----------

Modernizer.js should be the only JS in the header, so it’s hard to have a rule 
that will put it there, so we have put only this js in the index.html and it is 
not served from Plone’s js registry. In case if the site is loaded without the 
Diazo theme, the modernizer.js will be provided by Plone.

Mobile.css is not modified, and we are using Plone’s default files 
because they need to have the media attribute set, and in less there is no way 
to do the same thing as the media attribute does.


Best practices (Do's and Don'ts)
================================

Don't mix grid css classes with others
--------------------------------------
In order not to overwrite grid properties by accident, we encourage you to have
the theme specific CSS classes in a separate element. For example instead of 
this:
  <div class="cell width-full position-0 myclass">
You should have this:
  <div class="cell width-full position-0">
    <div class="myclass">


Centering a fixed width body
----------------------------
To be more precise, the title should be "Centering a fixed width container". The
main idea is to set a fixed width to the container that holds all the elements,
and center it. This way we can have a different background for the body and for
the container.
In base.less set the body-width to 100% and body-margin to 0. This will ensure
having the body background in full width. Next in template.less set the styling
for the container:

    #container {
        margin:0 auto;
        width:960px;
    }

Also if different backgrounds are needed, then add a background property here.


Having multiple looks for the portlets
--------------------------------------


Fix for IE7 hasLayout bug
-------------------------
Internet Explorer has a nice habit of not applying layout to some elements and 
that manifests in an overall messed up look of the site. Usually adding some
css properties that are default values in browsers resolve this bug, so first 
try setting them in global level, and if that messes up the look in other
browsers, only then apply it with the .ie7 parent class.
Read more about this bug and possible fixes on:
http://haslayout.net/haslayout


IE TinyMCE body background color bug
------------------------------------
If you are using the background-gradient mixin for the body tag, then IE will
apply the same gradient to the body tags within the iframes. To work around this
bug, set a new background gradient only for TinyMCE body that will go from white
to white:

    .mceContentBody {
        .background-gradient(#fff, #fff, #fff);
    }


How to hide elements
--------------------
Hide from both screenreaders and browsers: apply "hidden" css class.
Hide only visually, but have it available for screenreaders: .visuallyhidden
Hide visually and from screenreaders, but maintain layout: .invisible


Contain floats
--------------
Instead of having an additional element after the floats and applying clear:both
in your css, just apply the clearfix css class to your html element that 
contains the floated elements.
Note: clearfix class is defined in style.less.


Responsive Design
-----------------


Using custom fonts
------------------
@Font-Face is used for applying custom fonts. The preferred way is to have the
font files on your server and use that, and the other way would be to use
Google Font API or FontSquirrel. Both are free and have big font collection that
are licensed for web.
With google, only a stylesheet is added to the page, which points to their 
server and they will provide all the font files that are needed. 
With FontSquirrel you download everything and serve it from your server.
In case if you do not find the proper font, and have a web license for that 
font, FontSquirrel @Type-face Generator can be used to generate all the formats 
needed by browsers, and it will provide some basic html and css codes as well.
Important: The font used must be licensed for web usage.

The font-face is defined in base.less, and the font files should go into
themere_resources/fonts folder.


Useful reads
============

LESS CSS Shapes Library
https://github.com/NathanStrutz/LESS-CSS-Shapes-Library 

Lessins - collection of useful mixins
http://code.google.com/p/lessins/



