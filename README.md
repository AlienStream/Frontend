AlienFrontend
=============

The Frontend of alienstream.com is powered by angular 1.* 

It still uses Grunt because I started this a long long time ago when Grunt was mainstream and haven't migrated it to gulp yet.

To work on Frontend I usually just git clone and then run grunt serve from the dev directory, you'll of course need to: 
npm install all deps 
npm -g install grunt-cli and bower

The frontend points to production api by default but this can be overridden in the API service.

currently I'm using the following:
angular 1.*
bootstrap 3.*
font awesome 4.4.* 
