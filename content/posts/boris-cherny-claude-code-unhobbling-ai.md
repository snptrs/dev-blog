---
title: "Boris Cherney on Claude Code and unhobbling AI"
date: 2026-08-17
tags: ["ai", "claude code"]
summary:
---

Boris Cherney (the creator of Claude Code) recently [did an interview](https://www.youtube.com/watch?v=qyPCVqFUyDo) with Y Combinator. A lot of his insights are focused on how we 'unhobble' models, or stop interfering with how they'd naturally go about solving a problem.

> every six months, delete your CLAUDE.md, delete your skills, delete your hooks, see what the model does, and it might surprise you. And actually for Opus 5, this is something we really do recommend is just try deleting all of these things because the model might really just not need all those instructions that you needed for past models. ([6:56](https://youtu.be/qyPCVqFUyDo?si=q3Q96CVGIoZ-wcxI&t=416))

When I first starting coding with AI, I got pretty bad results unless I gave it a lot of context, skills and specific prompting. I used [Superpowers](https://github.com/obra/superpowers) for a while but I felt it was overkill, so I created my own simplified version. Then I started to feel that, as the models were getting more intelligent, trying to force them to use TDD or verify tasks the same way a human would was actually producing worse results.

Cherney says that for Opus 5, they deleted 80% of the system prompt. And he gives a couple of suggestions for how you can replace the system prompt to see what results you get:

- Use the `--system-prompt` flag to completely replace the system prompt with custom text, e.g. `claude --system-prompt "You are a React expert"` ([Docs](https://code.claude.com/docs/en/cli-reference#cli-flags))
- Use `--bare` to skip auto discovery of hooks, skills, memories etc. ([Docs](https://code.claude.com/docs/en/headless#start-faster-with-bare-mode))

> what's interesting is that the model is actually a little bit more intelligent without these prompts. That's something that we've been finding. But when you use Claude code as a product, you do actually want some of these prompts because it helps you use the product and it it helps the the product behave and the model behave in the way that you would want when when you're using it as a person. ([4:30](https://youtu.be/qyPCVqFUyDo?si=iMrW9OrLVe3Uihr2&t=271))

He then suggests reintroducing things gradually:

> only when you see it repeatedly stumble on the same thing, that's when you add it back. But you don't want to do it too early because remember like the model is going to read this instruction every single time you use it. So you really want to make sure that the model needs this instruction. ([8:15](https://youtu.be/qyPCVqFUyDo?si=f1DNJGty6fmMsznA&t=495))

In terms of how to use AI more effectively, he says:

> you should give the model slightly harder tasks than what you think it can do... You want to describe the task, you want to describe the guardrails, you want to describe like the exit criteria and then just go let the model cook and come back in a little bit and I think it'll surprise you... this is just not something that would've worked six months ago but it does work today. ([15:00](https://youtu.be/qyPCVqFUyDo?si=q0tSlA05yBihqqhS&t=900))

> I think the skill nowadays is less about prompt engineering and more about figuring out how do you give Claude a hard task that seems a little bit too hard and then how do you make it possible for Claude to verify its work along the way. And the verification I think is probably the single most important thing that people do not get right largely. ([20:15](https://youtu.be/qyPCVqFUyDo?si=C5lSOS42Ilb0or2i&t=1215))
