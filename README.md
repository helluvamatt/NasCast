NasCast
=======

A modular Node.js-based media library manager

*Warning* NasCast will rely on an XBMC instance running to gather media information and store metadata

Planned Features
----------------

* Common Module - common components used by other modules
    * MediaDatabase.js - Currently uses XBMC, will be moved to CoreXBMC
	* PostgreStore.js - PostgreSQL session storage for Connect
	* PgConfig.js - Multiple database configurations using inheritcant (needs work)

* Core Module - intended to run on the NAS box or storage server
    * [ ] Configuration-defined source directories for media
    * [ ] Automatic watching of directories
    * [ ] Automatic metadata lookup from theMovieDB and theTVdb
    * [ ] Simple HTTP streaming (with HTTP Range header support)
    * [ ] Query API (query the media stored/registered with this instance) for Mobile apps

* CoreXBMC - same interfaces as Core, except using XBMC for handling library scanning and meta data updates
	
* Web Module - this module is intended to run on a webserver
    * [ ] Mobile first (using Bootstrap 3)
    * [ ] Uses Query API from Core
    * [ ] Supports Google Cast
    * [ ] Provide a Google Cast Reciever application for Chromecast, etc. devices
	* [ ] Explore the possibility of controlling the Google Cast Receiver application through the server so we are not just relying on Google Chrome or Android/iOS clients to control Chromecast receivers
