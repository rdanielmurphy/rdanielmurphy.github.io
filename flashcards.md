---
layout: page
title: React Flashcards
backgroundpic: flashcards/flashcards.jpg
permalink: /projects/react_flashcards.html
---

# Why?
I created a flashcard apps to help with JavaScript trivia questions I get asked at interviews.  I opened sourced a demo version you can find on github and it's also hosted at [flashcards.rdanielmurphy.com][flashcards].

It's made to be very responsive so it should be easy to use on a phone as well as a laptop.

Flashcards are built with markdown and uses a Webpack loader to compile the markdown into a question/answer object.

<br>

# How to use?

#### Install and run
After you get the code, do:
{% highlight html %}
npm install
npm start
{% endhighlight %}

#### Add flashcards
To create a flashcard you must create a markdown file with extension .fc under the data folder.  But you must have a format like so:

{% highlight html %}
===QUESTION===
<mardown here>

===ANSWER===
<mardown here>
{% endhighlight %}

The you have to import (in js file same directory as child):
{% highlight html %}
import q from "./question1.fc";

const cards = {
    questions : [
        q
    ]
};

export default cards;
{% endhighlight %}

If it's a new group of cards, the two files above must be in a folder under data.  Then import that group in flashcard.data.js:

{% highlight html %}
import myCards from "./myCards/myCards";

const FlashCardData = {
    "js" :  {
        "name" : "JavaScript",
        "cards" : jsCards,
        "fa" : "code"
    },
    ...
    "myCards" : {
        "name" : "My Cards",
        "cards" : myCards,
        "fa" : "puzzle-piece"
    }
};

export default FlashCardData;
{% endhighlight %}


<br>
<br>

# Check it out!

<img src="../img/flashcards/screenshot.png" alt="screenshot" style="width: 90%;"/>

<br>
<br>
Source code is hosted on a public repo on [GitHub][github]

[github]:     https://github.com/rdanielmurphy/react-flashcards
[flashcards]: http://flashcards.rdanielmurphy.com