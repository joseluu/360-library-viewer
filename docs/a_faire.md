## 0. base
In this directory create a photo galery web site allowing display of 360 equirectangular photos using the panellum library. User identification is required but minimal, users have to give their firstname which is compared against an allow list, after 2 trials user is blacklisted with a cookie, when successful user is granted access for a year with a cookie. Library display is
one scrollable column on the right showing miniatures of the 360 photos. 
Depending on the user login name, the logged in user is allowed to view photos in a single directory. Initial set of viewers first names: ["Marie-Odile", "Jose", "Lisa", "Laurene", "Damien", "Dominique"] match the first names possibly without the capitalisation and the accentuated e. Initial set of photos are in subdiorectory Photos-360-Lisa-Damien-4-Avril/
## 1. addons
Put the allowed user list and the  User → directory mapping  in a separate file, add this file to .gitignore
Push project to my github under repo name "360-library-viewer".
Clone project on host googlevm, ssh googlevm is available already authentified. Deploy on port 4301. Prepare an nginx configuration file for domain viewer-360.duckdns.org. Use supervisorctl to control start-stop.
Use rsync to push the directory holding the files and the confidential User files
## 2. first names
Add the following first names to the allow list: 
Yann
Marie-Paule
Thomas
Brice
Mathilde
Louise
Anthony
Florent
Eudoxie
Arthur
## 3. make an electron package
With the same user interface, create an electron executable to be installed in the photolibrary. The executable does not check the firstname.