---
layout: post
title:  "Screen grabs with ADB"
date:   2015-10-09 11:05:40
backgroundpic: salt.jpeg
imagedetails: Salt Flats, Uyuni, Bolivia
categories: android
excerpt: How to do screen grabs the easiest was using tools provided by ADB
tags:
- android
---

If you are an Android dev, chances are you will need to post screenshots or record video of your app.  Well if you aren't using ADB to grab screen shots or record video of your phone, you really should be.  I just discovered this recently but it's the quickest and easiest way to get screenshots to your computer.

## Install ADB
Obviously you will need ADB for this.  So I'm going to assume you alredy have that installed.  

## Open up Terminal
Open up a terminal and go to the directory you want to put your screenshots and videos.

###Screenshot
{% highlight bash %}
adb shell screencap -p /sdcard/screencap.png
adb pull /sdcard/screencap.png
{% endhighlight %}

###Video
{% highlight bash %}
adb shell screenrecord /sdcard/screen.mp4
adb pull /sdcard/screen.mp4
{% endhighlight %}

Press Ctrl-C to stop the video recording.

<br>
Set the bitrate like so (12MB):

{% highlight bash %}
adb shell screenrecord –bit-rate 12000000 /sdcard/screen.mp4
{% endhighlight %}
