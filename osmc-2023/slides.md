---
theme: default
title: Metrics, Margins, Mutiny - How to Make Your SREs (not) Run Away
info: A lightning talk about SRE best practices.
date: 2023-11-08
event: OSMC 2023
location: Nuremberg, Germany
tags: ["SRE", "Non-Technical", "Talk"]
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: fade-out
css: unocss
monaco: true
src: ./slides/cover.md
---

---
transition: fade-out
layout: image-right
image: /dbodky.jpeg
---

# About me

<br />

<br />

* Consultant at NETWAYS since 2021

* Working with technologies like

  * Kubernetes
  * Ansible
  * Prometheus
  * Grafana

* Interested in DevOps and SRE practices

---
transition: fade-out
layout: two-cols
---

# Site

<br />

<br />

* In the beginnings, **the** site - [google.com](https://google.com)
* nowadays, an arbitrary service

  * Maps
  * Mail
  * Adds

* provided by an SRE team
* consumed by users

::right::

<br />

<br />

<br />

<br />

<img alt="Google in 2007" src="./public/google-2007.png" />

---
transition: fade-out
layout: default
---

# Reliability

<br />

<br />

* The ability of a service to perform as expected upon request

* This is **not** the same as **availability**

* A service can be **available** but not **reliable**

  * high latency

  * high error rates

---
transition: fade-out
layout: default
---

# Engineering

<br />
<br />

### Members of SRE teams are...

<br />

⛔ classical system administrators
<br />
⛔ mainly systems engineers
<br />
✅ software engineers, first and foremost


---
transition: fade-out
layout: quote
---

# “[At Google, ] Common to all SREs is the belief in and aptitude for developing software systems to solve complex problems”

Benjamin Treynor Sloss, Vice President, Google Engineering, founder of Google SRE

---
transition: fade-out
layout: default
---

# Responsibilities

<br />

<br />

<br />

<br />

<div class="flex justify-center items-center gap-24">
  <div>
    <ul>
      <li><b>Availability</b></li>
      <li><b>Latency</b></li>
      <li><b>Performance</b></li>
      <li><b>Efficiency</b></li>
    </ul>
  </div>

  <div>
    <ul>
      <li>Change Management</li>
      <li><b>Monitoring</b></li>
      <li><b>Emergency Response</b></li>
      <li>Capacity Planning</li>
    </ul>
  </div>
</div>

---
transition: fade-out
layout: section
---

# SLIs, SLOs, and Error Budgets

---
transition: fade-out
layout: image-right
image: ./wallet.jpg
---

# SLIs, SLOs, and Error Budgets

<br />

<br />

* SLIs (**Service Level Indicators**) are key metrics for your service(s)

* SLOs (**Service Level Objectives**) are targets for your SLIs

* Error Budgets are the difference between your SLOs and your actual SLIs

<div class="shoutout">
  Photo by <a href="https://unsplash.com/@emkal?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Emil Kalibradov</a> on <a href="https://unsplash.com/photos/person-holding-black-and-orange-box-swIN9v5uS5Y?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

---
transition: fade-out
layout: image-right
image: ./kiss.jpg
---

# Metrics Collection

<br />

<br />

* Looking at *all* metrics *all the time* is **not** feasible

* Focus on metrics that 

  * matter for your **end users**

  * can be used to forge **meaningful** SLIs


<br />

<br />

### **KISS** - **K**eep **I**t **S**hort and **S**imple!

<div class="shoutout">Photo by <a href="https://unsplash.com/@timmossholder?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Tim Mossholder</a> on <a href="https://unsplash.com/photos/red-kiss-neon-signage-7aBrZmwEQtg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

---
transition: fade-out
layout: image-right
image: ./dashboard.jpg
---

# SLI Generalization

<br />

<br />

**Generalize** SLIs:

Choose **sane defaults** for aggregation:

* **intervals** (e.g. 5 minutes)
* **methods** (e.g. average)
* **regions** (e.g. cluster-wide)
* **resolutions** (e.g. 10 second)

<br />

<br />

### **DRY** - **D**on't **R**epeat **Y**ourself!

<div class="shoutout">
Photo by <a href="https://unsplash.com/@hostreviews?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Stephen Phillips</a> on <a href="https://unsplash.com/photos/monitor-screengrab-shr_Xn8S8QU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

---
transition: fade-out
layout: section
---

# Dealing with Toil

---
transition: fade-out
layout: image-right
image: ./todos.jpg
---

# Identifying Toil

<br />

<br />

**Recurring, boring** tasks that **don't** lead to **long-term** benefits:

<br />

🗑️ Manually restarting services
<br />
🗑️ Manually executing scripts
<br />
♻️ Handling pager alerts (for the first time)
<br />
♻️ Refactoring code to reduce technical debt

<div class="shoutout">
Photo by <a href="https://unsplash.com/@theblowup?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">the blowup</a> on <a href="https://unsplash.com/photos/black-trash-bin-with-green-leaves-t06aN6vewaQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

---
transition: fade-out
layout: image-right
image: ./toil.jpg
---

# Managing Toil

<br />

<br />

* Distribute it evenly across the team

* Do it immediately

* Chip away at it, week by week

<div class="shoutout">
Photo by <a href="https://unsplash.com/@villxsmil?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Luis Villasmil</a> on <a href="https://unsplash.com/photos/people-sitting-on-chair-with-brown-wooden-table-mlVbMbxfWI4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

---
transition: fade-out
layout: image-right
image: ./recycle.jpg
---

# Minimizing Toil

<br />

<br />

Aim for

* *automatic*, not *automated* systems and solutions
* needed maintenance scaling **< O(n)**
* a shared mindset that *some* toil is **inevitable**, but *too much* is **unacceptable**

<div class="shoutout">
Photo by <a href="https://unsplash.com/@gary_at_unsplash?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Gary Chan</a> on <a href="https://unsplash.com/photos/litter-signage-YzSZN3qvHeo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

---
transition: fade-out
layout: section
---

# Being On-Call

---

# On-Call *is* Toil

<br >

On-Call time is a natural  **lower bound** to the amount of toil that can't be reduced.

**Be careful with introducing/allowing additional toil**.

<img class="absolute bottom-0 left-0 right-0 w-230" src="./public/oncall.jpg" alt="on-call rotation" />

---
transition: fade-out
layout: image-right
image: ./pager.jpg
---

# Balance is Key

<br />

<br />

**At Google**, two incidents per shift are seen as a good balance, leaving enough time for **proper handling** and **postmortems**.

<br />

* **More** incidents, and handling becomes hasty

* **Less** incidents, and the on-call engineer's time gets wasted

<div class="shoutout">
Photo by <a href="https://unsplash.com/@alex_andrews?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Alexander Andrews</a> on <a href="https://unsplash.com/photos/black-corded-telephone-JYGnB9gTCls?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

---
transition: fade-out
layout: image-right
image: ./idea.jpg
---

# Keep in mind

<br />

<br />

* Let your SREs **engineer**, not just **operate**

* Stay on top of our **SLIs**, **SLOs**, **Error Budgets**, and **Toil**

* **Act accordingly**

* Staff your SRE team(s) **appropriately**

<div class="shoutout">
Photo by <a href="https://unsplash.com/@jdiegoph?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Diego PH</a> on <a href="https://unsplash.com/photos/person-holding-light-bulb-fIq0tET6llw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>

---
transition: fade-out
layout: image-right
image: ./answers.jpg
---

# There's so much more

<br />

<br />

* Release Engineering

* Engineering for Automation

* Incident Management

... and much more. Maybe another time!

<div class="shoutout">
Photo by <a href="https://unsplash.com/@hadijasaidi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Hadija</a> on <a href="https://unsplash.com/photos/a-sign-that-is-on-the-side-of-a-hill-jCfDzOQ2-C8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
</div>
