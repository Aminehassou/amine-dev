---
author: Ahmed Amine Hassou
pubDatetime: 2023-08-27T04:01:01Z
title: Final Report - GSOC 2023
postSlug: final-report-gsoc
featured: true
draft: false
tags:
  - google summer of code
  - react
  - ruby on rails
  - wikimedia
  - wiki education dashboard
ogImage: "https://upload.wikimedia.org/wikipedia/commons/a/a7/GSoC-logo-horizontal.svg"
description: Reflecting on my GSOC Internship
---

![GSoC Logo Horizontal](https://upload.wikimedia.org/wikipedia/commons/a/a7/GSoC-logo-horizontal.svg)

My GSOC internship with the Wiki Education Dashboard is coming to a close. As a result, I am writing this report to go over my experience with the program!

This also serves as a follow up to my post from last month: [Halfway Through GSOC](https://aminedev.netlify.app/posts/halfway-through-gsoc/)

If you'd like to go straight to my list of contributions, please click [here](#list-of-contributions)

## Table of contents

## Introduction

If you haven't read my last post, here is a quick summary of the dashboard, taken from the project's Github repo

> The Wiki Education Dashboard is a web application that supports Wikipedia education assignments, edit-a-thons, and other editing projects. It provides data and course management features for groups of editors — instructors, students, and others — who are working on Wikipedia, Wikidata, and other Wikimedia wikis.

My project's main goals were to refactor all the React components in the codebase into functional components and upgrade from React 17 to React 18. I ended up working on adding a new feature to the dashboard as well. (I will get into this later on)

## Component Refactor Results

There are a total of 162 React components that needed refactoring. In my last post, I mentioned that I've refactored 46 components. That number has now gone up to a total of 71 components refactored (almost half!)

As you can tell, I did not manage to refactor every single component. However, I am still very happy with the quantity of components that I've refactored. I think this refactor has greatly improved code readability and scalability for a large part of the React codebase. Future developers of the dashboard will certainly benefit from working with the more modern tools available inside of functional components.

I also created this [GitHub issue](https://github.com/WikiEducationFoundation/WikiEduDashboard/issues/5393) to track all the components that have not been refactored yet. This should serve as a good resource for other dashboard developers to pick up where I left off.

## The aftermath of the React 18 upgrade

As mentioned in my previous post. I managed to succesfully upgrade from React 17 to React 18 with minimal issues. There aren't that many new features that came out to be instantly useful from this upgrade. However, there are a lot of small optimization that were made that have definitely helped performance. Things such as automatic batching make state re-renders less frequent and more reliable. Here's a snippet from the [official React 18 upgrade guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide) that talks about this feature:

> Starting in React 18 with createRoot, all updates will be automatically batched, no matter where they originate from. This means that updates inside of timeouts, promises, native event handlers or any other event will batch the same way as updates inside of React events

Another useful addition is the strict mode changes. Here's another snippet from the React 18 upgrade guide that talks about the changes:

> React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount.

The dashboard codebase does not use strict mode currently. However, there are plans to implement it at some point. So in the future, this will be great for debugging.

## Improving the ticket system search

After spending most of the internship working on component refactors, I decided to switch things up and work on something new. That's when I found this [GitHub issue](https://github.com/WikiEducationFoundation/WikiEduDashboard/issues/5481) related to improving the ticket system search functionality.

As a quick rundown, the dashboard has a tickets system where users can send tickets in to staff/instructors. These submitted tickets can then be searched for using the tickets view. At the time this issue was posted, users were only able to search with one search type at a time (email/username, content, subject or course slug)

What this issue asks for is to add the ability to search for tickets using multiple search types simultaneously. This required touching on both the frontend and the backend parts of the codebase.

The frontend had to be changed to add more input fields for the user. There needed to be 4 input fields so that users can search for all 4 search types at once.

The backend had to be changed to actually implement the queries needed that enable multi-search functionality. Instead of querying just one ticket attribute based on the inputted text, we now had to query up to 4 attributes based on how many search types are being used.

Here's what the tickets dashboard looked like before the changes were made:

![A screenshot of the tickets dashboard before the changes](https://i.imgur.com/IsiHfAT.png)

Here's what it looks like after:
![A screenshot of the tickets dashboard before the changes](https://i.imgur.com/izQKumT.png)

This was the first real time I had to really dig into the ruby on rails code to add some new functionality. So it was a great learning experience for me.

## Conclusion

Google Summer of Code has been such a great experience for me. Being able to improve both the developer and user experience of the dashboard, then having other users benefit from the improvements I've made is such a great feeling. I also think that I've learned so many new skills and refined old ones while going throught this intership!

GSOC has also convinced me to start being an active open-source developer. I will continue contributing to the dashboard even after GSOC ends!

## List of contributions

Here's a table showing all of the contributions I made to the Wiki Education Dashboard up to this point:
| PR | Title |
| --------- | ----- |
| [5485](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5485) | Converting Campaign, UserProfile and AssignmentList into functional components, removing unnecessary CampaignOverviewHandler component |
| [5482](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5482) | Add multi-search functionality to tickets system |
| [5480](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5480) | Converting ContributionStats, InstructorStats, Notifications and MainspaceChecklist into functional components |
| [5479](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5479) | Converting StatisticsUpdateInfo, BlockTypeSelect and CourseDetails into functional components |
| [5478](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5478) | Converting AcademicSystem, Description and CategoryHandler into functional components |
| [5475](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5475) | Converting SlideLink into functional component + removed unused grading components |
| [5474](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5474) | Converting CustomLink, UpdateDefaultCampaignSetting, UpdateSalesforceCredentials and UpdateCourseCreationSettings into functional component |
| [5473](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5473) | Converting GreetStudentsButton, AddSpecialUserButton and AddAdminButton into functional components |
| [5469](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5469) | Converting UserUploads and UserTrainingStatus into functional components|
| [5468](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5468) | Attempt at fixing ruby selenium driver issue |
| [5463](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/5463) | Converting CampaignEditable and TagEditable into functional components + fixed duplicate campaign and tag lookup |
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
