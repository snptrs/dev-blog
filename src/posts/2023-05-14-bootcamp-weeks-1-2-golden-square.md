---
title: "Bootcamp weeks 1 and 2: Golden Square"
date: 2023-05-14
tags: bootcamp
summary: Now we’ve completed the first four weeks of introductory content, the bootcamp got properly underway with the ‘Golden Square’.
---

Now we’ve completed the first four weeks of introductory content, the bootcamp got properly underway with the ‘Golden Square’. This is a pathway of content and challenges that introduced us to four of the central concepts we’ll be focusing on during the bootcamp:

- Test-driven development (TDD)
- Object-oriented design (OOD)
- Debugging
- Pair programming

We started off learning the basics of TDD in Ruby using RSpec. Then we moved onto designing multi-class systems, and learnt how to apply various debugging techniques. There were pair programming sessions every afternoon, and it was great to get to work with different teammates, figure out different people's learning styles, and try out different approaches to pairing.

## Takeaway project

The weekend project at the end of week 2 was to create a takeaway order management system. The requirements were to:

- Show a menu of available dishes
- Allow the user to place an order
- View an itemised receipt
- Send the user an SMS confirmation.

![Screenshot of the Takeaway app showing a menu and options for placing an order](/assets/images/posts/week-2-takeaway-project-screenshot.png)

I used the [colorize](https://github.com/fazibear/colorize) gem to make the terminal output a bit nicer. For sending the SMS confirmation, I used Twilio. It was really easy to set up an account, and the API is free for testing purposes (you have to pre-define recipient phone numbers, which was fine for this project). There's an official [twilio-ruby](https://github.com/twilio/twilio-ruby) gem which I used to handle the API interaction.

It's a really simple application, but I was quite surprised by how much I've already learnt, and was really excited when I received my first order confirmation text message.

{{ github_repo "https://github.com/snptrs/gs-solo-project", "A terminal-based takeaway ordering app built in Ruby with Twilio SMS integration." }}

{{ callout "takeaways" }}

1. Spending time planning classes, methods and tests was really worthwhile. I found that once I'd planned everything out properly, it was really quick to write the actual code.

2. I'd initially thought I'd interact with the Twilio API manually, but once I investigated the official gem, it was clear that it was a much more robust solution to just use that. It would've taken ages to write all the error and exception handling methods myself.
   {{ /callout }}

{{ callout "challenges" }}

1. The second half of the module involved a lot of mocking in RSpec, which I found pretty challenging at first. Actually implementing the mocks and stubs is straightforward, but I found it a difficult concept to get my head around at first. I had to take a step back and read a few blog posts and watch some YouTube videos to try and understand the basics before going back and implementing them myself.
   {{ /callout }}
