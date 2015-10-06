---
layout: post
title:  "Getting your domain name on your Digital Ocean droplet"
date:   2015-09-13 09:01:45
backgroundpic: museo_de_oro_bogota_gates.jpg
imagedetails: Museo de Oro, Bogota, Colombia
categories: digitalocean hostname
--- 

##Preface

So I had a Digital Ocean droplet running and hosting my Jekyll site on an IP address that I could get to by typing in the IP address into the browser.  I already had a domain name for an old site I was hosting on a friend's web server.  So I need to get my domain name to point to the IP address of my Digital Ocean droplet and not the IP address of the old site.  Below is how I did it.

##Step One - Change Your Domain Server
Log into the control panel of your domain registrar.  Meaning wherever you bought your domain, log into that control panel, be it a web server or an actual domain registrar, like NameCheap or Enom.

If you don't remember where you created your name, you can look it up by typing in the command prompt the command below:

{% highlight bash %}
whois mysite.com
{% endhighlight %}

My control panel looked like this: 

![nameservers](/img/domain-nameservers.png)

So change the domain servers to match the DigitalOcean domain servers:

* ns1.digitalocean.com
* ns2.digitalocean.com
* ns3.digitalocean.com

To verfiy, hit up whois again and it should display the following:

{% highlight bash %}
Name Server: NS1.DIGITALOCEAN.COM
Name Server: NS2.DIGITALOCEAN.COM
Name Server: NS3.DIGITALOCEAN.COM
{% endhighlight %}

##Step Two—Configure the Domain

Log into the Digital Ocean control panel and go to DNS.  Add a domain like below:

![nameservers](/img/add-domain.png)

Don't add a www subdomain to the beginning.  Just the domain name.

On the next page you will add the subdomains.  Below is what mine looks like.  I have rdanielmurphy.com, test.rdanielmurphy.com, and www.rdanielmurphy.com.  In that order.

![nameservers](/img/sub-domains.png)

##Finished!!

That's it.  It will take some time for the information to propogate.  Wait a couple hours at least to check.  You can test by typing the following command into a command prompt (assuming you created a test subdomain):

{% highlight bash %}
#ping test.mysite.com
PING test.mysite.com (12.34.56.789) 56(84) bytes of data.
64 bytes from 12.34.56.789: icmp_req=1 ttl=63 time=1.47 ms
64 bytes from 12.34.56.789: icmp_req=2 ttl=63 time=0.674 ms
{% endhighlight %}
