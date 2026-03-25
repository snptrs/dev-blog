---
title: "Bootcamp week 7: Frontend JavaScript"
date: 2023-06-25
tags: ["bootcamp"]
summary: Having focused mainly on learning the basics of JavaScript and running it in Node last week, this week we started to focus more on the frontend.
---

Having focused mainly on learning the basics of JavaScript and running it in Node last week, this week we started to focus more on the frontend. The learning objectives for this week were:

- Test-drive a simple Javascript program running in a web browser, using modern JS build tools.
- Use the DOM API to build a web user interface for this program.
- Build a single-page web application fetching and updating remote data using JS.

I've been using HTML and CSS for a long time, so I was already pretty comfortable with concepts like the DOM, events and how to use the browser's developer tools. Where it got trickier though was having to create both a backend and a frontend and have them interact with one another. I could really feel all the knowledge I've picked up over the course so far coming together to help me with that.

TDD was also a lot more challenging this week. We still used Jest for everything, and I'm pretty comfortable with it now, but it felt like there were a lot of plates to keep spinning when switching between mocking API interactions, testing DOM elements, and then producing integration tests.

### News headlines project

The final project for the week was to create a news app that fetches the latest stories from the Guardian API and generates a summary of them using AI.

![](/assets/images/posts/news-app-screenshot-1.jpg)

![](/assets/images/posts/news-app-screenshot-2.jpg)

![](/assets/images/posts/news-app-screenshot-3.jpg)

Although the Guardian API documentation looks like it hasn't been updated for several decades, it was surprisingly easy to get up and running with it and pull in the latest headlines.

To generate summaries of the articles, I tested out a few different options. The one that gave the best results was [Kagi's Universal Summariser](https://kagi.com/summarizer/index.html) (as a sidenote, Kagi is a fantastic search engine that I happily pay for). I really struggled to get it working when calling the API from the frontend though (another good reason for creating a simple backend for my app - see _takeaways_ below for more on that). So in the end I used OpenAI. The quality of the summaries isn't great, although I could probably improve them by spending some time tuning the prompt.

The most challenging part was getting the layout working. I had very little experience with CSS layout, so I spent a lot of time learning Flexbox. Once I knew what I was doing, it was really simple to create a grid of cards for the headlines.

It was a really enjoyable project, and one I plan to return to and develop further.

{{< github_repo url="https://github.com/snptrs/news-summary-challenge" description="A frontend news summary app using the Guardian API and OpenAI." >}}

{{% callout "takeaways" %}}

1. When you're interacting with an API from a frontend app, it's a real pain to manage authentication without accidentally exposing credentials. For the purposes of testing my news summary app, I just passed keys for the Guardian and OpenAI APIs in the query string. If I decided to deploy a production version of this, I'd need to create a simple backend that handled to API calls so I could store the credneitals as environment variables.
   {{% /callout %}}

{{% callout "challenges" %}}

1.  I found working with a monorepo much more confusing than I thought I would. Trying to keep track of what was happening in the backend versus the frontend, making sure the right servers and build process were running for each, and catching errors in the relevant consoles was all conceptually quite challenging.
    {{% /callout %}}
