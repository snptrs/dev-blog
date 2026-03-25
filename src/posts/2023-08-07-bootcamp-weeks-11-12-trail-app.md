---
title: "Bootcamp weeks 11 and 12: Trail app"
date: 2023-08-07
featured: true
tags: bootcamp
coverImage: /assets/images/posts/trail-app-cover.jpg
summary: The final project is completely self-driven, from ideation to deployment. An opportunity to put into practice everything we've learnt.
---

It's incredible how quickly the past few months have gone. When I started the course and joined the demo day for the cohort who were just finishing, I couldn't believe I'd ever produce anything as good as what they'd built. And yet here we were!

The final project is completely self-driven, from ideation to deployment. It's an opportunity for us to put into practice everything we've learnt over the previous four months.

I was in a group with [Eugene](https://github.com/Shakhrai8), [Jessica](https://github.com/jessbealey88) and [Joe](https://github.com/joehannis). We decided to make a location-based app that finds your five nearest tourist attractions, uses AI to give you a brief history of them, and then generates an audio guide using text-to-speech so that you can listen to it on the move.

## Getting started

From the outset, we all agreed that we needed to clearly define the features we wanted and be quite opinionated about what our app is there to do. We realised it would be easy for it to become a bit of a Google Maps clone, and we were clear we didn't want that to happen.

Once we'd decided on the core purpose and features, we started diagramming and wireframing and arrived at a user flow that we were all happy with.

![Wireframe of the app's main pages](/assets/images/posts/trail-wireframe.png)

## Building it

We decided to use the MERN stack as we wanted to get more practice with each of those technologies. Although for the features we implemented, we ended up not needing Mongo.

We created:

- A React frontend. It makes an API call with the user's location to our backend. We used `useQuery` to handle the requests and caching.
- A Node/Express backend which handles all the API calls and processes the data so it can be used by the frontend.

We used Jest and Cypress for testing.

Of the services that we researched for generating the place descriptions, we thought Bard would work best as it has access to real-time data, but we couldn't get access to its API at the time. We went with OpenAI for the purposes of building a prototype, but we're planning to switch that once Bard is available.

We also used Google's TTS service as it had the best balance of cost, usability and quality.

## The finished product

Overall we were really happy with the finished product. We delivered what we'd planned to build, on-time and well-tested.

Towards the end of the project, I worked on deploying it online. I tested out a few different services, and decided to deploy both the backend and frontend to Railway. It's a fantastic service, and I'll probably do a separate post about how to deploy an Express/React app with it.

![Screenshots of the finished app](/assets/images/posts/trail-screenshots.png)

Friday of the second week was Demo Day and we had to present our apps to the rest of our cohort, other cohorts, and prospective bootcamp students. It was fantastic to see everyone's projects, and really motivating to see how far we've all come in four months.

<div class="relative aspect-video"><iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/RbDLEwK9aYs" frameborder="0" allowfullscreen></iframe></div>

And with that, the Bootcamp is done! Now begins the equally hard work of job hunting (and also finally getting to work on the ever-expanding list of side projects I've been desperate to get going with).

## Links

{{< github_repo url="https://github.com/snptrs/trail-app" description="A trail planning app built as a final bootcamp project." >}}

- Production version is live at [trailapp.net](https://trailapp.net/)

{{% callout "takeaways" %}}

1. Having a really clear vision about the app's purpose was useful for keeping us on track. Whenever we felt a bit directionless or couldn't decide whether to add a new feature, being able to return to our mission statement about what the app should be doing always helped get us going in the right direction again.
2. This isn't really news to anyone, but this project reaffirmed to me that having clear, achievable tickets and rigorously managing the Trello board is absolutely key to not losing direction or momentum. Once we figured out a prioritisation method that we were all happy with, managing out workflow became a much easier.
   {{% /callout %}}

{{% callout "challenges" %}}

1. Every API that we wanted to use worked in a completely different way, and even figuring out the basics of how to authenticate with each of them was quite time-consuming. Even APIs from the same provider can be completely different (we used totally different authentication methods for Google's Places and TTS APIs, for example). In future, I'll make sure I prioritise learning how particular APIs work right at the start of the project; it'll save a lot of headaches further down the line.
2. ChatGPT can't be relied on to generate accurate descriptions. We knew this before we started – it's designed to sound convincing, not to be accurate. But I think we were all surprised but just how convincingly it makes up complete nonsense. I found myself saying "Wow, I never knew that thing near my house had such an interesting history," only to discover that it was completely made up. I'm currently testing some different AI models to see if any of them are better are dealing with real-world locations.
3. Writing Cypress tests proved quite difficult for the components that query the user's location. I need to do some more research into better ways of mocking geodata, or figure out how to get Cypress to play nicer with the browser's location services.
   {{% /callout %}}
