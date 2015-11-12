---
layout: post
title:  "Scraping Fantasy Sports data with Java and Selenuim"
date:   2015-11-09 07:59:45
backgroundpic: lapaz6.jpeg
imagedetails: La Paz, Bolivia
categories: java
tags:
- java
excerpt: How I used Selenium to scrape fantasy football data from ESPN with the help of Selenium
---

# Introduction 

Like just about everyone else, I've started to get interested in the world of DFS (Daily fantasy sports).  Seems like a good alternative to online poker, though I'm convinced there's more variance in DFS so it will be harder to consistently win.  Either way, the more data you can have at your fingertips, the better you should be able to make decisions.  So I've been looking into APIs that can deliver me data, unfortunately I haven't found any good free ones (if any free ones).  There do appear to be some extensive fantasy sports APIs but you will need to pay up (~$1,000+ a month).

So since that's a little out of reach for me, I don't see why I can't just scrape that data (most of it is public) and store it for myself.  My first target was to get the points against data for fantasy football.  One of the most important stats for judging who to start and who to sit on your fantasy roster.  Armed with just this data and a player's average fantasy output per week, you should at least break even as a DFS player, if not make a little money.
<br>
<br>

## Step 1 - Go to website and look at source
Go to your prefered fantasy sports data website and on the page that has a table of data you want to scrape, take a look at the source and check the id field on the table.  For example at [http://games.espn.go.com/ffl/pointsagainst?&positionId=1][link] the id of the table we want is "playertable_0".  That is the same for the QB table as it is for th RB table and etc...  It will be different for every site.  Some sites might not even set an id on the table, that's where things will get a little trickier but you can still find the table with Selenium (it's a wonderful tool).

For this tutorial we will assume you have an id for the table.  Next step I did was create a Java project that imports the Selenium library via Gradle.
<br>
<br>

## Step 2 - Set up Java project
I used IntelliJ and Gradle for all things Java these days.  So I created a Gradle project and first thing was imported the Selenium Java library like so:

{% highlight java %}
compile('org.seleniumhq.selenium:selenium-java:2.48.2')
{% endhighlight %}

Re-sync gradle and you can verify that the library was imported by importing Selenium classes in your main Java class like so:

{% highlight java %}
import org.openqa.selenium.WebDriver;
{% endhighlight %}
<br>
<br>

## Step 3 - Write code to get data in table
First create a web driver:
<br>

{% highlight java %}
WebDriver driver = new FirefoxDriver();
{% endhighlight %}
<br>

Now write code to get all the text from the table.
<br>
{% highlight java linenos %}
private String getTableText(WebDriver driver, String url) {
  driver.get(url);
  WebElement findElement = driver.findElement(By.id("playertable_0"));

  return findElement.getText();
}
{% endhighlight %}
<br>

The URL for me would be the same one above ([http://games.espn.go.com/ffl/pointsagainst?&positionId=1][link]).  
<br>
This will return you basically every cell seperated by a new line string (\n).  So the format for the ESPN points against table was:
<br>
{% highlight html %}
Saints vs. QB
Ten
Sun 1:00 184/284 2386 20 4 27 115 2 0 0 0 0 22.6
Ravens vs. QB ** BYE ** 193/288 2406 16 3 26 89 2 0 0 0 0 21.5
Buccaneers vs. QB
NYG
Sun 4:05 165/233 1833 17 4 26 88 1 0 0 0 0 19.7
Lions vs. QB ** BYE ** 183/250 2157 14 4 33 145 2 1 12 0 1 19.1
Giants vs. QB
.....
{% endhighlight %}
<br>
Not exactly what I was expecting or hoping for.  So will need a smart way to make sense of this.  Luckily the lines are all in order so we can come up with some algorithm like:
<br>

#### Start with an empty string and iterate over the array of lines:

+ Concatenate the line to the string.
+ Check if string starts with a team name and ends with a double.
+ If true add line to team avg points against list and reset string.  If not go back to 1st step. 

<br>

{% highlight java linenos %}
String htmlTableText = getTableText(driver, url);
String[] lines = htmlTableText.split("\\n");

List<String> strings = new ArrayList<String>();

//skip first two header lines
for (int i = 2; i < lines.length; i++) {
  String fullLine = lines[i];

  while (!isFullLine(fullLine) && i < lines.length) {
    fullLine += " " + lines[++i] + " ";
  }
  string.add(fullLine);
}
{% endhighlight %}
<br>
{% highlight java linenos %}
private boolean isFullLine(String line) {
  boolean result = false;

  String[] splits = line.split("\\s");
  
  //if starts with a team mascot name and ends with a double
  if (NFLConstants.NFL_TEAM_MAP.containsKey(splits[0])) {
    int size = splits.length;

    // if not a double, and exception will be thrown.  
    // not the best code but what the hey.
    try {
      double num = Double.parseDouble(splits[size - 1].toString());
      result = true;
    } catch (Exception e) {
    }
  }

  return result;
}
{% endhighlight %}
 <br>
NFL_TEAM_MAP is a map where the keys are mascot names and the values are the locations.  Looks something like this:
<br>
{% highlight java linenos %}
NFL_TEAM_MAP.put(JETS, new NFLTeam(JETS, JETS_LOC));
NFL_TEAM_MAP.put(GIANTS, new NFLTeam(GIANTS, GIANTS_LOC));
NFL_TEAM_MAP.put(SEAHAWKS, new NFLTeam(SEAHAWKS, SEAHAWKS_LOC));
{% endhighlight %}
<br>
Now that we got the data from the table all sorted out into a list of strings we can understand, let's parse them.
<br>

## Step 4 - Parse strings
Parsing the string is the easiest part for this example, since we are just parsing out the team and the average points against.  Not all the stuff in the middle.  Just the first and last parts of the string array.
<br>
{% highlight java linenos %}
public class NonKickerPointsAgainstDto extends PointsAgainstDto {
    public NonKickerPointsAgainstDto(String[] parts, int type) {
        setType(type);
        setAvgPoints(parts[parts.length - 1]);
        setTeam(parts[0]);
    }

    @Override
    public String toString() {
        return getTeam().getMascot() + " vs " + Constants.TYPES.get(type) + " surrender on average " + getAvgPoints() + " fantasy points";
    }
}
{% endhighlight %}
<br>
To make the string array from the string we created (the string representing a row in the table we re-assembled), we will split it by a regex statement.  We could just split by a space character but if in the future we want to parse the stats in the middle, we will want to make sure extra spaces don't mess up our parsing so we split by one or more spaces:
<br>
{% highlight java linenos %}
String [] parts = line.split("\\s+");
return new NonKickerPointsAgainstDto(parts, type);
{% endhighlight %}
<br>
The TYPES map you are seeing is a map of the positions:
<br>
{% highlight java linenos %}
public static final Map<Integer, String> TYPES = new HashMap<Integer, String>();
static {
  TYPES.put(POINTSAGAINST_QB_TYPE, "QB");
  TYPES.put(POINTSAGAINST_RB_TYPE, "RB");
  TYPES.put(POINTSAGAINST_WR_TYPE, "WR");
  TYPES.put(POINTSAGAINST_TE_TYPE, "TE");
  TYPES.put(POINTSAGAINST_K_TYPE, "K");
  TYPES.put(POINTSAGAINST_D_TYPE, "D");
}
{% endhighlight %}
<br>
That's it.  Now once you are finished, close and quit the web driver to clean up:
<br>
{% highlight java %}
driver.close();
driver.quit();
{% endhighlight %}
<br>

## Step 5 - Output
Screenshot of data on ESPN:
<br>
<img src="/img/espn.png" alt="espn" style="width:70%">

<br>

Output of program:
{% highlight html %}
QB
------------------------
Saints vs QB surrender on average 23.7 fantasy points
Ravens vs QB surrender on average 21.5 fantasy points
Lions vs QB surrender on average 19.1 fantasy points
Raiders vs QB surrender on average 18.9 fantasy points
Buccaneers vs QB surrender on average 18.8 fantasy points
Giants vs QB surrender on average 18.2 fantasy points
Browns vs QB surrender on average 18.0 fantasy points
Jaguars vs QB surrender on average 17.9 fantasy points
Bears vs QB surrender on average 17.6 fantasy points
Texans vs QB surrender on average 17.6 fantasy points
49ers vs QB surrender on average 17.3 fantasy points
Titans vs QB surrender on average 17.1 fantasy points
Colts vs QB surrender on average 16.9 fantasy points
Dolphins vs QB surrender on average 16.9 fantasy points
Steelers vs QB surrender on average 16.8 fantasy points
Chargers vs QB surrender on average 16.8 fantasy points
Packers vs QB surrender on average 16.8 fantasy points
Bills vs QB surrender on average 16.4 fantasy points
Redskins vs QB surrender on average 16.3 fantasy points
Chiefs vs QB surrender on average 16.1 fantasy points
Patriots vs QB surrender on average 16.0 fantasy points
Jets vs QB surrender on average 15.1 fantasy points
Eagles vs QB surrender on average 15.0 fantasy points
Panthers vs QB surrender on average 14.8 fantasy points
Cowboys vs QB surrender on average 14.5 fantasy points
Bengals vs QB surrender on average 14.3 fantasy points
Vikings vs QB surrender on average 13.9 fantasy points
Cardinals vs QB surrender on average 13.9 fantasy points
Falcons vs QB surrender on average 13.8 fantasy points
Seahawks vs QB surrender on average 13.3 fantasy points
Rams vs QB surrender on average 11.5 fantasy points
Broncos vs QB surrender on average 9.3 fantasy points
{% endhighlight %}

<br>

## Conclusion
Check out the full source on [GitHub][github]


[link]:    http://games.espn.go.com/ffl/pointsagainst?&positionId=1
[github]:  https://github.com/rdanielmurphy/FantasyFootballScraper