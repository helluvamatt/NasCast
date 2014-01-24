NasCast
=======

A modular Node.js-based media library manager

Planned Features
----------------

* Core Module - this module is intended to run on the NAS box or storage server
    * [ ] Configuration-defined source directories for media
    * [ ] Automatic watching of directories
    * [ ] Automatic metadata lookup from theMovieDB and theTVdb
    * [ ] Simple HTTP streaming (with HTTP Range header support)
    * [ ] Query API (query the media stored/registered with this instance) for Mobile apps

* Web Module - this module is intended to run on a webserver
    * [ ] Mobile first (using Bootstrap 3)
    * [ ] Uses Query API from Core
    * [ ] Supports Google Cast
    * [ ] Provide a Google Cast Reciever application for Chromecast, etc. devices