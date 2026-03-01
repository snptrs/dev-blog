---
title: "Bootcamp weeks 8 and 9: Acebook"
date: 2023-07-16
tags: bootcamp
summary: Time for another group project! I was in a team with Arbnor, Heather, Jessica, Khuslen, Osman and Shoaib.
---

Time for another group project! I was in a team with [Arbnor](https://github.com/Arbnor01), [Heather](https://github.com/heatherbrandwilliamson), [Jessica](https://github.com/jessbealey88), [Khuslen](https://github.com/kganzorig), [Osman](https://github.com/Oztheproblem) and [Shoaib](https://github.com/shoaiblatif22).

The brief was to create a simple social networking site, allowing users to register, log in and out, create posts, upload images and view a feed of other users' content.

We were asked to use the MERN stack (MongoDB, Express, React, Node), and Makers gave us some basic code (mainly for parts of the authentication, routing and testing) to get started.

## Getting started

We made a collective decision to spend the first couple of days learning and planning, and didn't start actually coding until day three.

We started by diving into the existing codebase, writing some tests to understand how different bits of it work, and creating some sequence diagrams and wireframes.

![Initial diagram to help understand the user flow and class interactions](/assets/images/posts/acebook-diagram.png)

## Tech insights

There were lots of interesting technical aspects to this project, but I'm going to focus on three specific parts: authentication, image uploads, and the database.

### Authentication

In the basic code that Makers gave us, there was already a JWT token generator and checker implemented as middleware in the Express server. We decided to stick with that as it worked pretty well, and we built our registration and login functions around that.

I'd spent some time learning about authentication for the [Chitter challenge](/2023-06-05-bootcamp-week-4-web-applications/) and I was familiar with how to hash and validate passwords with BCrypt, so I led on implementing most of this functionality.

Although it worked well, we had to debug quite a few issues with tokens not being properly invalidated when they expired, and components not re-rendering properly when a user logged out. For future projects, I'd try to either use a third-party authentication service, or investigate what good libraries are available to handle some of it.

### Image uploads

We wanted users to be able to attach photos to their posts, and also upload profile photos when they registered. None of us had much experience with handling file uploads, and Heather took the lead on investigating what options were available.

We ultimately decided to use Multer as middleware in our Express server to handle the uploads. We were planning to then store and serve the images from Firebase, but we ran out of time and ended up just storing them in our server's filesystem instead. Definitely not an approach we'd roll out to production, but it worked fine for demo purposes.

### MongoDB

None of us had used MongoDB before, so I took on the task of figuring out how best to use it for this project. Shout out to this excellent tutorial which gave me enough information to get going with it.

Although it was tempting to retreat to our comfort zone and try and make Mongo work like a relational SQL database, we all agreed that we wanted to try and do things the Mongo way and get the most out of the way it worked.

One example is how we set up our Posts collection. In a relational database, we'd have created separate tables for posts, comments and likes, and then linked them all together. Instead of that, our Posts collection ended up having comments and likes fields which are just arrays, and we push new comments and likes into those (and they each have user fields which reference our Users collection).

There are definitely pros and cons to both approaches, but for our purposes and given the rest of the tech stack we were using, MongoDB worked fantastically well (and I was grateful to have a couple of weeks off from figuring out how to construct massive join queries in SQL!).

## The finished product

We were really pleased with the end product. It had all the functionality we'd set out to include, and it was well tested on the backend with Jest and on the frontend with Cypress.

![](/assets/images/posts/acebook-feed.png)

![](/assets/images/posts/acebook-profile.png)

The code we produced was clean and well planned, and I'm pretty sure I'll reuse some of it in future projects whenever I need to implement social functionality.

[GitHub - snptrs/bootcamp-acebook](https://github.com/snptrs/bootcamp-acebook)

{% callout "takeaways" %}

1. MongoDB is great! It just worked seamlessly and fits so logically into a JS app like this. I found myself evangelising about it to anyone who would listen.

2. I need to spend a bit of time investigating options for hosting images. Once we started to dive into it, there was so many potentail solutions it was a bit overwhelming. Having a couple of go-to options in my back pocket would be useful for when I next work on a project that needs robust image processing and hosting.

3. We had really clear goals for which features we wanted to implement, and we stuck pretty rigidly to our Trello tickets. If we hadn't been so organised, we definitely wouldn't have finished all the features on time.
   {% endcallout %}

{% callout "challenges" %}

1. Learning enough React to be able to build this application in less than two weeks was challenging. But taking a couple of days at the start of the project to try and learn as much about it as we could definitely paid dividends later on. (I've subsequently done a Frontend Masters React course which was brilliant, and I'm now pretty comfortable with it.)
   {% endcallout %}
