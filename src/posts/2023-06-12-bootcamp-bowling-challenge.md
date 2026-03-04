---
title: "Bowling challenge"
date: 2023-06-12
featured: true
tags: bootcamp
coverImage: /assets/images/posts/photo-1545056453-f0359c3df6db.jpg
summary: The final challenge for week five was to create a bowling scorecard program. Conceptually, this was the most difficult project so far and it required a lot of research and planning.
---

The final challenge for week five was to create a [bowling scorecard program](https://github.com/snptrs/bootcamp-bowling-challenge). Conceptually, this was the most difficult project so far and it required a lot of research and planning.

The requirements were:

- Count and sum the scores of a bowling game for one player.
- Create it as a terminal app using Ruby.
- No database backend needed.

## Why is bowling scoring so tricky?

I'd never thought about how bowling scores are calculated, but when I saw this challenge I assumed it must be fairly straightforward. It isn't. A lot of the complexity comes from the fact that when you get a strike or a spare in a frame, the  score for that frame isn't calculated until the next one or two balls have been bowled. That means you're often going back to previous frames and updating their scores.

To add extra complexity, the first nine frames basically work the same way (two bowls per frame, or one if you get a strike), but the tenth frame can have up to three bowls.

I started by watching some YouTube videos about bowling scoring. (As a result, my  feed is now full of bowling content. Gotta love the algorithm!) I then diagrammed the first couple of frames of a game to help me understand the logic.

![Flowchart showing how scoring works for the first two frames of a bowling game](/assets/images/posts/bowling-challenge-diagram.png)

## Designing the application

I initially thought I'd use an array of hashes to store the ball, frame and bonus scores. I started sketching that out, but it was clear that it would quickly get difficult to manage. It also didn't feel right to separate the data from the methods like that. The essential unit of the game is a frame, so it felt more logical to take a properly object-oriented approach and create instances for each frame.

![Class relationship diagram showing Application, Frame, ScoreCard and Gameplay classes](/assets/images/posts/bowling-challenge-class-diagram.png)

I designed a class system that separated the various elements into:

- `Frame` which is a model class and holds the score for each frame, along with methods like `.strike?` that can be called by the other classes to determine if a particular frame contains a strike.
- `Application` which creates 10 `Frame`s when the application is first run, and contains a `run` loop which calls the `Gameplay` methods.
- `Gameplay` contains various methods to prompt for and process terminal IO, and determine whether the game is over.
- `Scorecard` has various methods to calculate frame and game scores, and apply frame bonuses after strikes and spares.

## Final product

I tried a few different ways of displaying the output, but I wasn't happy with any of them. There's surpsingly high information density in a traditional bowling scorecard, and it's hard to replicate that in a different format. So I decided to figure out how to draw a proper scorecard template in the terminal.

![](/assets/images/posts/bowling-challenge-terminal.png)

I started by drawing a single frame in ASCIIFlow, then broke that down into [template methods](https://github.com/snptrs/bootcamp-bowling-challenge/blob/main/lib/scorecard.rb#L9). There's some slightly clunky code in there, and if I get a chance to go back and refactor, I'd look at making better use of `map` to re-sort the array elements into the correct order. Overall though, I was surprised and pleased that I managed to get the formatting to work.

{{ github_repo "https://github.com/snptrs/bootcamp-bowling-challenge", "A bowling scorecard program built in Ruby as a terminal app." }}

{{ callout "takeaways" }}

1. Taking the time to properly learn how bowling scoring works before I started planning the application paid dividends. If I'd started coding before I understood the logic, I know I'd have ended up needing to scrap the code and start again.

2. This is one of the first projects I've done where I've truly understood the benefits of object-oriented programming. Being able to call methods like `.frame_score` from within the frame is such a neat and efficient way of approaching things.
   {{ /callout }}

{{ callout "challenges" }}

1. A couple of the methods are in the wrong classes. `.final_score` needs to move from `Gameplay` into `ScoreCard`, for example.
2. Drawing the scorecard could be refactored to make it simpler.
3. Everything is unit tested, but I need to implement more integration testing (particularly for terminal IO).
   {{ /callout }}
