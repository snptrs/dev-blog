---
title: "Bootcamp week 6: JavaScript fundamentals"
date: 2023-06-17
tags: ["bootcamp"]
summary: It was all-change this week as we switched from Ruby to JavaScript. A tough but useful week of learning the fundamentals.
---

It was all-change this week as we switched from Ruby to JavaScript. The learning objectives for the week were:

- Test-drive a simple JavaScript program using Node.
- Explain how asynchronous programming is different from synchronous, blocking programming.
- Apply a coherent process to learn a new language.

Overall it was a pretty tough week, but also one of the most useful weeks of the course so far.

Having started to get fairly comfortable in Ruby, it was initally quite demoralising to suddenly be back at the start with a new language, not knowing how to even do ‘Hello, world!’ or FizzBuzz. It was a real test of resillience to have to push through and get my head around basic concepts all over again.

But after a couple of days I had a bit of an epiphany and realised that the fundamentals are very similar across both languages. I started creating [a cheatsheet](https://github.com/snptrs/til/blob/main/categories/cheatsheets/ruby-javascript-comparison.md) to compare the similarities and differences. Although there are already lots of  similar cheatsheets available, creating it myself forced me to really understand the concepts and research things in the Ruby and JavaScript documentation.

The most challenging part was trying to understand asynchronous programming. It’s a big mindset shift from working with a synchronous language like Ruby. [Yevhen](https://github.com/Shakhrai8) and I spent hours pairing and trying to create passing tests for [a simple Pokédex](https://github.com/snptrs/bootcamp-javascript-fundamentals/tree/main/challenges/5-pokedex) that retrieved data from an API. Small mistakes like not correctly returning a value from a promise, or incorrectly chaining `.then` statements constantly tripped us up.

By the end of the week, I was comfortable enough with JavaScript to start [accessing data](https://github.com/snptrs/bootcamp-javascript-fundamentals/tree/main/challenges/6-weather) from the OpenWeather API, and [creating an Express server](https://github.com/snptrs/bootcamp-javascript-fundamentals/tree/main/challenges/4-thermostat) to enable interaction with a project I'd created earlier in the week.

## Bowling challenge in JavaScript

It feels like I'm never going to escape from the bowling scorecard! The weekend challenge for this week was to rewrite [the scorecard](/2023-06-12-bootcamp-bowling-challenge/) I created the previous week in Ruby, but this time in client-side JavaScript.

It was relatively easy to translate the classes and methods from Ruby into JS. Adding a frontend was a bit trickier though, as we hadn't learnt about using templates with Express yet. I did some research and ended up using Handlebars. I created a simple layout in HTML, and then use Handlebars to populate the scores after each turn.

![](/assets/images/posts/bowling-challenge-js-screenshot.png)

With benefit of hindsight and having now learnt a bit more about JavaScript, if I were to do this challenge again I'd do it in React. It would be much easier to set this up as React componenents and use hooks to refresh the scores.

Rendering the template server-side with Handelebars was a good learning experience though, and I'm starting to understand the pros and cons of both approaches depending on the type of project now.

{{% callout "takeaways" %}}

1. Jest is similar enough to RSpec that it was pretty easy to get up and running with JavaScript tests. In fact, mocking seems more straightforward in Jest. Even testing interaction with DOM elements was fairly simple. It seems like the most challenging aspect of testing is coming up with tests that actually test the right things; I definitely wrote a few tests this week that weren't testing what I thought they were testing.
   {{% /callout %}}

{{% callout "challenges" %}}

1. Some of the basics that are so fundamental to JavaScript are quite tricky to get your head around at first. Asynchronicity is a bit mindblowing when you're used to working in a syncronous language. Even the concept of using callback functions takes a lot of getting used to. It's worthwhile taking the time to really understand these concepts from the outset.
   {{% /callout %}}
