---
theme: ./
fonts:
  sans: Nunito
  serif: Lilita One
  mono: Fira Code
---

# Organizing LEGO Building Contests for Online Communities

## with BrickContests

---
layout: image-right
image: ./sigfig.png
---

# About me

<br/>

<br/>

- Daniel (dbodkylego)
- Member of RogueBricks LUG
- AFOL since 2020
- I like building contests, just not _participating_ in them

---
layout: section
---

# How it all started

---

# The Timeline

<Timeline
  :visible="1"
  :entries="[
    { date: '2020-05', label: 'Daniel participates in the IronForge' },
    { date: '2021-11', label: 'RogueBricks launch Brickscalibur' },
    { date: '2025-12', label: 'Multiple community-run contests use BrickVote' },
    { date: '2026-06', label: 'BrickContests goes live' },
  ]"
/>

---

<img src="./public/sheet.png" class="w-180 m-x-auto"/>

---

# IronForge 2020

<br/>

What I saw:

- ~120 entries in the first round
- 5 jury members
- all managed through spread sheets

The implications:

- Each checkmark, username, build info, and link had to be entered manually
- Working with sheets can be brittle (misclicks, duplicated inputs/sheets, etc.)

---

<Timeline
  :visible="2"
  :entries="[
    { date: '2020-05', label: 'Daniel participates in the IronForge' },
    { date: '2021-11', label: 'RogueBricks launch Brickscalibur' },
    { date: '2025-12', label: 'Multiple community-run contests use BrickVote' },
    { date: '2026-06', label: 'BrickContests goes live' },
  ]"
/>

---
layout: two-cols
---

# Brickscalibur and Iron Forge

<br/>

- both contests created by _rolli_ and supported by RogueBricks
- both feature many participants, jury members, and submissions
- both come with complex scoring mechanisms for specific categories

<br/>

<br/> 

<v-click>

## "We _have_ to write a tool for that!"

</v-click>

::right::

<img src="./public/brickscalibur.png" class="m-l-10 w-80 m-t-20"/>

---

# Brickscalibur and Iron Forge

<br/>

The first Brickscalibur had ...

- ... _181_ submissions by _~100_ participants
- ... _6_ jury members
- ... _3258_ submission scores
- ... a broad idea of what a contest organizing tool could look like

<br/>

## ... and _BrickVote_ was born

---
layout: section
---

# How it continued

---

<img src="./public/brickvote-1.png" class="m-x-auto w-240"/>

---

<img src="./public/brickvote-2.png" class="m-x-auto w-240" />

---

<Timeline
  :visible="3"
  :entries="[
    { date: '2020-05', label: 'Daniel participates in the IronForge' },
    { date: '2021-11', label: 'RogueBricks launch Brickscalibur' },
    { date: '2025-12', label: 'Multiple community-run contests use BrickVote' },
    { date: '2026-06', label: 'BrickContests goes live' },
  ]"
/>

---

# Fast-Forward to 2025

Other community contests came to _BrickVote_ by word-of-mouth:

<div class="chips">
  <span class="chip chip-red">Summer Joust <small>InnovaLUG</small></span>
  <span class="chip chip-yellow">Vignweek <small>RebelLUG</small></span>
  <span class="chip chip-blue">MELO <small>LOTRLUG</small></span>
  <span class="chip chip-red">Marchitecture <small>by Rauy</small></span>
</div>

<v-click>

<div class="facts">
  <div class="fact fact-red"><div class="num">54</div><div class="lbl">contest rounds</div></div>
  <div class="fact fact-yellow"><div class="num">154</div><div class="lbl">categories</div></div>
  <div class="fact fact-blue"><div class="num">1,563</div><div class="lbl">participants</div></div>
  <div class="fact fact-blue"><div class="num">3,909</div><div class="lbl">submissions</div></div>
  <div class="fact fact-red"><div class="num">75</div><div class="lbl">jury &amp; admin users</div></div>
  <div class="fact fact-yellow"><div class="num">61,012</div><div class="lbl">jury votes</div></div>
</div>

<p class="facts-footer">on <em>BrickVote</em> over four years</p>

</v-click>

<style>
.chips { display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1rem 0 1.5rem; }
.chip {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  color: #fff;
}
.chip small { font-family: var(--font-body); font-size: 0.7rem; opacity: 0.9; margin-left: 0.4rem; }
.chip-red { background: var(--color-primary); box-shadow: 0 3px 0 var(--color-primary-dark); }
.chip-yellow { background: #c79400; box-shadow: 0 3px 0 #8f6a00; }
.chip-blue { background: var(--color-accent); box-shadow: 0 3px 0 #004a80; }

.facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.fact {
  color: #fff;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  text-align: center;
}
.fact .num { font-family: var(--font-heading); font-size: 3rem; line-height: 1.1; }
.fact .lbl { font-weight: 700; font-size: 1rem; opacity: 0.95; }
.fact-red { background: var(--color-primary); box-shadow: var(--shadow-primary); }
.fact-yellow { background: #c79400; box-shadow: 0 4px 0 #8f6a00; }
.fact-blue { background: var(--color-accent); box-shadow: 0 4px 0 #004a80; }
.facts-footer { text-align: center; margin-top: 1rem; color: var(--color-text-muted); }
</style>

---

# Problems with BrickVote

<br/>

It wasn't all smooth sailing:

- the admin dashboard took minutes **!** to load once enough votes were cast
- admins needed to enter _every. single. submission._ themselves<br/>Editing those submissions was a pain, too
- jury workflows were lacking usability and speed
- you needed to know me (or rolli) to be able to use BrickVote

<br/>

<br/>

<v-click>

## It was time for a successor!

</v-click>

---
layout: section
---

# Where we are now

---

<Timeline
  :visible="4"
  :entries="[
    { date: '2020-05', label: 'Daniel participates in the IronForge' },
    { date: '2021-11', label: 'RogueBricks launch Brickscalibur' },
    { date: '2025-12', label: 'Multiple community-run contests use BrickVote' },
    { date: '2026-06', label: 'BrickContests goes live' },
  ]"
/>

---

# Tenets of BrickContests

<br/>

A few things I had in mind when working on BrickVote's successor:

- **_Anyone should be able to organize contests_** - The website is public, and anyone can sign up.
- **_Contests should be discoverable_** - Organizers can post contests well in advance, so FOLs have a chance of discovering them in time.
- **_Contests deserve archives_** - Each contest keeps its contents indefinitely after it ends, for FOLs to browse through.
- **_Admins deserve some sleep_** - Participants now submit their MOCs themselves. Admins can still moderate their contests.

---

# What BrickContests can do today

<br/>

Features currently available in BrickContests:

- Public and private contests
- Managing jury and co-admins
- Moderating contests, categories, and submissions
- Collab-feature for MOCs by groups of creators
- Social links (Discord, Instagram, Flickr, Youtube), comments, and reactions for MOCs
- Leaderboards for contests, categories, and custom criteria
- Mobile-friendly for admins, juries, and participants

<br/>

<v-click>

## But did the FOL community want something like this?

</v-click>

---
layout: section
---

# The legal stuff

---

# I don't want your data (and others won't get it)

<br/>

What you can count on if you use BrickContests:

- The service is hosted entirely in the EU (Germany) and complies with GDPR (DSGVO)
- You keep all rights to uploaded media; I don't reuse, share or publish them anywhere else
- I don't make any money with this, and don't intend to.<br/>The cost of maintenance is transparently broken down on the website, as are donations.

<br/>

<br/>

## Privacy Policy and Terms of Service are available on the website

---
layout: section
---

# What's in the future

---

# Plans for BrickContests

<br/>

As more contests will run on the website, I am planning to add more features:

- Better and faster display of media
- Better UX and UI for admins, juries, and participants
- More options to customize leaderboards, categories, prize displays, etc.
- Achievements (general and contest specific)
- Multilingual interface

<br/>

<v-click>

## Got an idea? Let me know 😉

</v-click>

---
layout: section
---

# A big thank you

---

# Without the LEGO community, this wouldn't exist

<br/>

Thanks to all

- Admins who trusted me with their preexisting contests and hosted them on BrickVote and now BrickContests
- Jury members who used (rather **endured**) the platform(s) over the years, and provided feedback
- FOLs who signed up to this new website and submitted beautiful MOCs already

---

# Special thanks

<br/>

These two trusted me with their contests for the past 5 years, provided tons of feedback, and kept their calm when things went wrong.

<div class="flex justify-center gap-24 mt-8">
  <div class="flex flex-col items-center gap-4">
    <img src="./public/rolli.png" class="w-48 h-48 rounded-full object-cover" />
    <span class="text-3xl" style="font-family: var(--font-heading)">rolli</span>
  </div>
  <div class="flex flex-col items-center gap-4">
    <img src="./public/soccerkid.png" class="w-48 h-48 rounded-full object-cover" />
    <span class="text-3xl" style="font-family: var(--font-heading)">soccerkid6</span>
  </div>
</div>

---

# Thanks to you - for listening!

<br/>

Here's a few helpful links:

- [brickcontests.com](https://brickcontests.com) if you want to host your own contest or participate in one
- [brickcontests.com/faq](https://brickcontests.com/faq) if you've got questions
- [brickcontests.com/how-to](https://brickcontests.com/how-to) for ways to get started
- [slides.dbodky.me/brickcontests](https://slides.dbodky.me/brickcontests) if you want to share these slides with other FOLs
