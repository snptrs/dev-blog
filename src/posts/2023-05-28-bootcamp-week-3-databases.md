---
title: "Bootcamp week 3: Databases"
date: 2023-05-28
tags: bootcamp
summary: This week we started learning about databases. Using Ruby and PostgreSQL, we completed a range of modules and challenges starting with simple single-table designs, right through to more complex multi-...
---

This week we started learning about databases. Using Ruby and PostgreSQL, we completed a range of modules and challenges starting with simple single-table designs, right through to more complex multi-table joins.

It felt like a step up in difficulty, and most of us found it challenging to get through all the content. But working through the many (many!) errors I encountered during the week really helped develop my testing and debugging skills, and by the end of the week I was feeling fairly confident about creating schemas, seeds and SQL queries.

There were also plenty of opportunities to practice skills I started learning over the previous couple of weeks, including analysing user stories, [creating design documents](https://github.com/snptrs/bootcamp-databases/blob/main/3-joins-and-many-to-many/4-designing-many-to-many/challenge.md), and [making diagrams](https://github.com/snptrs/bootcamp-databases/blob/main/2-challenges/3-diagramming/challenge-diagram.md) to visualise how all the components fit together.

## Shop Manager project

The final project of the week was to create a basic retail stock and order management system using Ruby.

![Screenshot of a terminal window showing details of a retail order](/assets/images/posts/shop-manager-screenshot.png)

I started off by [designing](https://github.com/snptrs/shop-manager-challenge/blob/main/shop_manager_design.md) the tables, classes and methods. For the Postgres database, I created `orders` and `items` tables, and an `items_orders` join table.

I used the [colorize gem](https://github.com/fazibear/colorize) to spruce up the terminal output. I also created a `Format` class to handle output. It's something I started thinking about in the previous week's challenge, and it seems sensible to separate out all the repetitive spacing and tweaks needed to try and make the terminal output more reabable.

```ruby
class Format
  def string(text = "", color = :default, spacing = "")
    return if text == ""
    text = text.colorize(color)
    text = "\n#{text}" if spacing == :pad || spacing == :before
    text = "#{text}\n" if spacing == :pad || spacing == :after
    return text
  end

  def currency(price)
    return sprintf("£%.2f", price)
  end

  def header(text)
    return string("====== #{text} ======", :red, :before)
  end
end
```

This lets me do something like `Format.string("Lorem ipsum", :cyan, :pad)`, which will return “Lorem ipsum” in blue with linebreaks before and after.

Overall I was pretty pleased with the [finished product](https://github.com/snptrs/shop-manager-challenge). I put a lot of effort into the RSpec tests, and was happy to get 95% test coverage. Given more time, the next steps would be to implement error handling and better input validation.

{{% callout "takeaways" %}}

1. Debugging by inserting `binding.irb` breakpoints into my code proved invaluable this week. We learnt about it earlier in the course, but being able to go into methods and see what was actually being returned from database queries saved me a huge amount time and head-scratching.

2. There were lots of points throughout the week when I was completely stumped by a concept. I've decided that if I understand 75% of something, it's better to keep moving ahead as the same concepts will keep being revisted and eventually they click into place. I'm becoming much more comfortable with being in a constant state of confusion!

3. Getting good at reading documentation seems like an important skill to develop. Looking up in the Postgres docs how to do a calculation in a SQL UPDATE statement took me about 30 seconds; it would've taken longer than that to find a decent Stack Overflow answer or wade through a possibly-made-up answer from ChatGPT. Not to say those resources aren't useful, but sometimes just starting with the official docs is the quickest and most reliable route.
   {{% /callout %}}

{{% callout "challenges" %}}

1. I needed to mock a lot of Terminal IO in RSpec, and found it challenging to create the right tests when there was lots of input and output. I ended up stubbing some methods when I should have been using output from real classes, just so I could isolate the data and get the tests to pass. Definitely need to do more research into RSpec best-practice. The [RSpec Style Guide](https://rspec.rubystyle.guide) and [Better Specs](https://www.betterspecs.org) seem like good starting points.

2. Managing the volume of directories, projects and files I needed to create and keep track of this week was challenging. After spending the first few days juggling a mass of disorganised files, I adopted a ruthless approach to setting up new projects, naming things, and making sure that everything was where I expected it to be.
   {{% /callout %}}
