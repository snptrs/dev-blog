---
title: "Bootcamp week 4: Web applications"
date: 2023-06-05
tags: ["bootcamp"]
summary: Everything we've learnt so far came together this week and we finally got to create some actual web apps! 🥳
---

Everything we've learnt so far came together this week and we finally got to create some actual web apps! 🥳

Topics for the week included:

- Understanding the basics of HTTP requests and responses.
- Using Sinatra to create routes and serve webpages.
- Writing unit and integration tests for web applications.
- Deploying database-driven apps to cloud hosting platforms.

Everyone seemed to enjoy this week more than last week, and the workload was more manageable. It's been a definite morale-boost to get a glimpse of what all this learning and endless hours of testing and debugging are training us be able to do.

## Chitter project

The final project for the week was to build a basic Twitter clone. The requirements were for users to be able to:

- Register and log in.
- Publish ‘Peeps’ and view a timeline of all the posts.
- Tag other users who’d then get an email notification (this was a stretch requirement, but I managed to implement a basic version of it).

![Screenshot of ‘Chitter’, a basic social media feed](/assets/images/posts/wk-4-chitter-screenshot.png)

The database for this project was more simple than for last week's [Shop Manager](/2023-05-28-bootcamp-week-3-databases/) app. I just needed `users` and `peeps` tables, with a one-to-many relationship between then. If I were to implement proper threaded replies, I'd re-think the database schema as I think it might be more efficient to add a join table.

I used the `bcrypt` gem to hash and check user passwords, and Sinatra sessions to keep track of user login status. If a logged-out user tries to post a Peep, they’ll be redirected to the login screen.

Once I’d got the MVP up and running, I created a branch to work on the email notification feature. I really wanted to try and implement it, but didn’t think I’d have time to complete it over the weekend, so I developed it in a branch so that it wouldn’t affect my main app.

I used Mailgun to send notifications, and wrote a very (very) basic method to match `@mentions` at the start of a Peep. I then updated my Peep creation method to pass all new posts through this.

I was really pleased with the [final product](https://github.com/snptrs/bootcamp-chitter-project). I even added a proper README with deploy instructions. I can’t imagine anyone would want to use this (slightly clunky and fairly flaky) app, but it’s there if anyone wants it!

{{% callout "takeaways" %}}

1. I learnt a lot from the Chitter project about encrypting and validating passwords, managing user sessions and sending transactional emails. `bcrypt` is amazing!

2. Plan, plan, plan! I produced a lot of code this week, and with the number of different challenges and projects there were to juggle, it would have got really confusing if I hadn’t planned effectively. I’ve realised that spending lots of time of designing database schemas and application classes pays dividends further down the line.

3. I had a bit of an epiphany this week about test-driven development. Up to now, I've felt like it was a bit of a pain to have to keep writing tests before I actually produce any code. But it all seemed to click into place this week, and I’ve realised it actually speeds up the development process (and saves time debugging) if you just put in the effort up front to write good tests.
   {{% /callout %}}

{{% callout "challenges" %}}

1.  I'm not doing a great job of tracking learning objectives (or updating my [TIL](https://github.com/snptrs/til)). I need to try and set aside some time every day to reflect on what I've learnt.
    {{% /callout %}}
