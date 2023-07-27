---
author: Ahmed Amine Hassou
pubDatetime: 2023-07-27T06:42:01Z
title: Halfway Through GSOC
postSlug: halfway-through-gsoc
featured: true
draft: false
tags:
  - google summer of code
  - react
  - wikimedia
  - wiki education dashboard
ogImage: "https://upload.wikimedia.org/wikipedia/commons/a/a7/GSoC-logo-horizontal.svg"
description: A look back at the work I've done so far
---

![GSoC Logo Horizontal](https://upload.wikimedia.org/wikipedia/commons/a/a7/GSoC-logo-horizontal.svg)

I have officially hit the halfway mark for my GSOC internship. I thought this would be a good time to
write a blog post going over my experience so far!

## Table of contents

## Introduction

I got accepted as a GSOC intern with the Wikimedia Foundation back in May of this year. The project I'm working on is called the
Wiki Education Dashboard. Here is a quick summary of the dashboard, taken from the project's Github repo

> The Wiki Education Dashboard is a web application that supports Wikipedia education assignments, edit-a-thons, and other editing projects. It provides data and course management features for groups of editors — instructors, students, and others — who are working on Wikipedia, Wikidata, and other Wikimedia wikis.

For my project proposal, I decided to focus on improving the React codebase by working towards two major improvements:

- Refactoring all React components into functional components
- Upgrading from React 17 to React 18

## Refactoring Components

For this part of my project. I set out to refactor every class component that was still a part of the React codebase. Initially, I did a
quick regex search to look for all mentions of the react class definition syntax, an example of the syntax I was looking for would be something like:

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

This would allow me to easily get a list of all files that have class components in them. This regex search found 29 React files that were using class components. I created this [GitHub issue](https://github.com/WikiEducationFoundation/WikiEduDashboard/issues/5393) to track the conversion of each file. However, if you take a look at the github issue, you'll notice there are a lot more than 29 components being listed. This is actually because my initial search forgot to take into account a much older, legacy way to define react classes.

Before the release of ES6, class syntax was not natively supported by Javascript. To work around this, the React team introduced a `create-react-class` module that allowed you to define component classes without ES6. Here's an example that uses this module to create a basic class component.

```js
var createReactClass = require("create-react-class");
var Greeting = createReactClass({
  render: function () {
    return <h1>Hello, {this.props.name}</h1>;
  },
});
```

Taking this syntax into account, my new regex search found a total of 162 files that needed to be refactored. Which is a lot more than the original 29. So far, I've refactored 46 components. So that leaves 116 components to go.

Throughout my experience refactoring class components, I've picked up on a lot of useful skills to help formalize the component conversion process. I'll be working on a blog post that goes more into the technical details of this component refactor which should be released 2 days from now.

## Test Problems

For the upgrade to React 18, the main roadblock was the enzyme tests. Enzyme is a Javascript testing utility for react that allows you to unit test your react components. The dashboard has two test suites. The ruby tests and the React Enzyme tests. The main issue is that enzyme does not support react 18. This means that an upgrade to react 18 requires either the removal of all enzyme tests, or the replacement of the tests with a more modern react testing library such as React Testing Library.

You may think that the replacement of the tests is the no-brainer choice here. And that is true in most cases. But it gets a little bit more complicated. It turns out that one of the main ways Enzyme tests components is by comparing component state values with their expected values. This works fine with class components. But my component refactor actually conflicts with this because there is no way to get a functional component's state in enzyme. Nor is it recommended in any of the more modern testing libraries for React. For example, here is what React Testing Library states in regards to this:

> You want to write maintainable tests for your React components. As a part of this goal, you want your tests to avoid including implementation details of your components and rather focus on making your tests give you the confidence for which they are intended. As part of this, you want your testbase to be maintainable in the long run so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down.

We have an outdated testing library that doesn't support react 18, the testing paradigm seems to have shifted from focusing on implementation details to focusing on testing general component behavior. So using a new testing library would require not only a full rewrite of the react testing suite, but also a rethinking in regards to the test logic for a large part of the component tests. Not to mention that the test suite spanned 100+ tests. This would take a lot of work to get done and could probably be its own GSOC project.

So, after some discussions with my mentor and other GSOC interns, the decision was made to remove the enzyme tests completely. This isn't as big of a loss as it seems because the dashboard also has a very comprehensive ruby test suite that tests both the frontend and backend functionality. Moving forward, any new frontend tests will be written as part of the ruby test suite too.

## Upgrading to React 18

Now that the tests are taken care of, it's time to move on to the upgrade!
Initially, I thought that the upgrade would be the most time-consuming portion of my internship because React loves introducing drastic, paradigm-shifting changes into their new versions (remember react hooks and server components?). Surprisingly, the react upgrade was pretty smooth. Some things did break (they always do...). But the fixes were pretty straight-forward:

- `ReactDOM.render()` was deprecated in favor of `createRoot()`. So that had to be replaced
- New warnings were popping up in the console for components that were returning invalid values inside of `useEffect` (I did not find any documentation for this in the migration guide but these warnings did not exist while running react 17). So those had to be fixed.

Then after a bunch of manual testing from both me and my mentor, we decided the upgrade was ready to go, so it was merged!

So everything went according to plan... Except I accidentally removed all the javascript tests and not just the react ones. Of course this wasn't a big deal because we use Git. But it's a great reminder as to why developers use version control systems. A quick rollback dealt with the issue and the crisis was averted.

## Contributions so far

Here's a table showing all the merged PRs I've made so far to the wiki education repo (during the internship period):
| PR | Title |
| --------- | ----- |
| [5458](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5458) | Converting EmbedStatsButton into functional component |
| [5457](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5457) | Converting Confirm into functional component |
| [5456](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5456) | Converting Nav and HamburgerMenu into functional components |
| [5454](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5454) | Converting Intro, Permissions and Finished into functional components |
| [5453](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5453) | Mark pagepile test as a pending test |
| [5452](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5452) | Converting AlertsHandler, Article and AvailableArticle into functional components |
| [5449](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5449) | Converting DidYouKnowHandler, PlagiarismHandler, RecentEditsHandler and RecentUploadsHandlerBase into functional components |
| [5443](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5443) | Converting Affix, PeerReviewChecklist and FinalArticleChecklist into functional components |
| [5442](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5442) | Converting ActivityHandler, ActivityTableRow and ActivityTable into functional components |
| [5441](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5441) | fixed ArticleViewer bug related to direct links |
| [5440](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5440) | refactored course embed feature |
| [5437](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5437) | Upgrade to React 18 |
| [5435](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5435) | Converting Articles into functional component |
| [5434](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5434) | Converting EnrollButton into functional component |
| [5429](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5429) | Converting Upload and AssignButton into functional component |
| [5427](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5427) | Converting BadWorkAlert and Overview into functional components |
| [5426](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5426) | Converting TicketsHandler and DeleteNote into functional components |
| [5424](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5424) | Converting MyArticlesContainer and MyExercicesContainer into functional components |
| [5423](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5423) | Removed unnecessary display of alert button in article finder's preview article UI |
| [5419](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5419) | Converting TaggedCourseAlerts, SyllabusUpload and ProgressTracker into functional components |
| [5418](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5418) | Converting RangeGraph and TextResults into functional components |
| [5413](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5413) | Converting ArticleViewer into a functional component |
| [5411](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5411) | Converting TicketShowHandler, NewReplyFrom and NotificationsBell into functional components |
| [5410](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5410) | Added documentation about assigning user roles |
| [5406](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5406) | Converted StudentDrawer, QuestionResults, FollowUpQuestionResults, CourseAlertsList components into functional components |
| [5404](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5404) | Converting StudentRevisionsList and Assignment class components into functional components |
| [5401](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5401) | Converting LanguagePicker and Sidebar class components into functional components |
| [5400](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5400) | Fixed alert table course highlight bug |
| [5397](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5397) | Converting CampaignAlerts class component to functional component |
| [5394](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5394) | Converting AdminAlerts class component to functional component |
| [5392](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5392) | Fixed popover height issue for student details page |
