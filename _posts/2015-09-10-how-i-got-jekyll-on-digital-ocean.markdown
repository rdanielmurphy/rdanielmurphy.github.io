---
layout: post
title:  "New Jekyll powered blog!"
date:   2015-09-10 12:04:40
categories: jekyll digitalocean nginx blog
---

Here are the steps I went through, more or less, to build this blog.  

##Tech Stack

The tech stack here is pretty simple:  Digital Ocean droplet, Nginx web server, and Jekyll.

##Digital Ocean 
First step is to set up your Digital Ocean account.  Now if you don't have a Digital Ocean account, let me know and I'll send you my code :wink:  Free money for both of us.

I used a $5 a month droplet with a Ubuntu distribution.

After that you should follow the 3 part guide on connecting to your droplet with ssh [here][three-part-guide].

Second step, now that you are connected to your droplet over ssh, install [Nginx][nginx-guide] and Git.

##Jekyll Blog and Git
Third step is to start building your Jekyll blog locally ([tips][jekyll-start]), push it to a [git][git-help] repo like [github][git-hub-help] or [bitbucket][bitbucket-help], then make it automatically push to your digital ocean server at the same time using git post-receive hooks [here][deploy-to-DO].

After all of this I got an error from the server when I tried to push.  This was the error:

{% highlight bash %}	
remote: jekyll 2.5.3 | Error:  Permission denied @ dir_s_mkdir - /var/www/yourblogdirectory/meta/2012
{% endhighlight %}

To fix that I just changed the read/write permissions of the directory.  Not the ideal solution but it works for now:

{% highlight bash %}
sudo chmod -R 777 /var/www/yourblogdirectory
{% endhighlight %}

##That's It!
To create blog posts you create files in the _posts folder [tips][creating-posts] and write the posts using [Markdown][markdown-help].

For styling, you might want to use the [Jekyll themes][jekyll-themes] site to get a decent style to start with that you can configure later.

Let me know if you followed this guide and it didn't work for you.  I probably missed something!

[three-part-guide]:   https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh
[nginx-guide]:        https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-12-04-lts-precise-pangolin
[jekyll-start]:       http://jekyllrb.com/docs/quickstart/
[git-hub-help]:       https://help.github.com/articles/creating-a-new-repository/
[bitbucket-help]:     https://confluence.atlassian.com/bitbucket/create-a-repository-221449521.html
[git-help]:           http://classic.scottr.org/presentations/git-in-5-minutes/
[deploy-to-DO]:       https://www.digitalocean.com/community/tutorials/how-to-deploy-jekyll-blogs-with-git 
[creating-posts]:     http://jekyllrb.com/docs/posts/
[markdown-help]:      http://daringfireball.net/projects/markdown/
[jekyll-themes]:      http://jekyllthemes.org/