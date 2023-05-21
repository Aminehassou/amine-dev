import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://astro-paper.pages.dev/",
  author: "Ahmed Amine Hassou",
  desc: "My personal tech blog",
  title: "Amine Hassou",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,

  postPerPage: 5,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Aminehassou",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-amine-hassou/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
];
