---
layout: post
title:  "Restoring deleted files in Android Studio"
date:   2015-10-05 08:05:40
backgroundpic: lapaz.jpeg
imagedetails: La Paz, Bolivia
categories: programming android
---

I recently deleted a Java class from an Android application I was working on in Android Studio while refactoring the packages.  I was deleting classes I no longer needed when I accidently deleted one I did in fact need!  No worries though, everything is backed up on git right?  Well while the file was in fact backed up in source control, it had been heavily modified and the changes uncommitted.  Sure I could restore it through git, but then I'd lose all my changes that I didn't commit yet.  

Ever had that issue before?  Well luckily there's solution.  At least if you are working in IntelliJ and Android Studio.

Right click on your <b>Project</b>.  Go down to <b>Local History</b> and then to <b>Show History</b>.

It will take a while to load, don't be worried when it says "History is empty".  Eventually it will fill the list of history.

Find the file in the list.  Order is most recent to least.  Click revert on the file and voilá!

Saved me a lot of pain and heartache when I figured this out.  