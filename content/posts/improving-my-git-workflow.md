---
title: "Improving my Git workflow"
date: 2025-07-23
featured: true
tags: ["workflow"]
coverImage: /assets/images/posts/photo-1556075798-4825dfaaf498.jpg
summary: In my early experiments using AI for coding, I’d often get stuck in a spiral of it just hammering away adding more and more code to try and work around a problem that it didn’t understand.
---

In my early experiments using AI for coding, I’d often get stuck in a spiral of it just hammering away adding more and more code to try and work around a problem that it didn’t understand. Once they start tunnelling, they think the only way out is to keep going through.

Now I’m getting better at using these tools, I find it easier to spot when they’re going off track and get them to change course. But I realised that if I was in situations where I needed to nuke my whole feature branch to get back on track, I probably wasn’t using Git effectively.

So what I’m doing now is maintaining a temporary working branch off of my feature branch. For example, if I have a feature branch `user-auth`, I branch `t/user-auth` off of that. I commit to the temp branch after every meaningful change. Then when I know something’s working, I review the code, tidy it up and squash all those commits into the feature branch.

If everything goes wrong, I either undo a few commits from the temp branch and try again, or trash it and pick up where I left off on the feature branch.

This feels liberating because I don't have to worry about how many commits I’m making or how good my commit messages are. I’m the only person who sees the temp branch, and I make sure whatever I merge into the feature branch is of good enough quality to later do a PR into `main`.
