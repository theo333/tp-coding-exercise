# TP Coding Exercise

## Install and Run Instructions
To install the app:
`npm install` or `yarn install`

To run the app in development mode:
`npm start` or `yarn start`

Open http://localhost:3000 to view it in the browser.

## Exercise Instructions
- Use the Reddit API to query r/aww and implement infinite scrolling with a list of results.
- On initial page load, the app should automatically retrieve the first 25 records.
- When you scroll to the end of the list, load 25 more records.
- Each list item should display the title, thumbnail if available, and the original subreddit name. Clicking the title should navigate to the original reddit post.
- Choose whichever sorting you'd like (top, new, etc).
- You must use at least two different components (ex: reddit-list-item, reddit-list-container.)
- You can use any framework you prefer, do not use any other external libraries or plugins to create the infinite scroll logic or any other interactive mechanics
- include installation and running instructions, host the solution on a git-supported platform (github, bitbucket etc)

## Question
There was one thing that I was not sure if I totally understood in the instructions, but did not want to hold up my submission due to it:

"Each list item should display the title, thumbnail if available, and the **original subreddit name**."

**original subreddit name** - is that just `r/aww` for all of them?  That did not totally make sense to me. The only other item property that I thought this might be referring to is `name` which has a value something like `t3_p0daum` (obviously unique to each post).  It is an easy fix.

## Notes
- ALT tag - best to include some text that describes the image, however, no such text is provided from the api

## Improvements
- Replace 'Loading more items...' with a spinner
