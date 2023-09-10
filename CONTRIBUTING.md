Contributing to justapenguin_ca
=======================

_tl;dr: be [courteous](CODE_OF_CONDUCT.md), follow the steps below to set up a development environment;_

Welcome
-------

We invite you to join the justapenguin_ca team, which is made up of volunteers!
There are many ways to contribute, including writing code, filing issues on GitHub, helping people
on our mailing lists, our chat channels, or helping to triage, reproduce, or
fix bugs that people have filed, adding to our documentation,
doing outreach about justapenguin_ca, or helping out in any other way.

We grant commit access (which includes full rights to the issue
database, such as being able to edit labels) to people who have gained
our trust and demonstrated a commitment to justapenguin_ca.

We communicate primarily over GitHub.

Before you get started, we encourage you to read these documents which describe some of our community norms:

1. [Our code of conduct](CODE_OF_CONDUCT.md), which stipulates explicitly
   that everyone must be gracious, respectful, and professional. This
   also documents our conflict resolution policy and encourages people
   to ask questions.

2. # Values

* ## 🏗️ Build the best way to develop user interfaces.

  This tells us what we are creating. It helps narrow our focus.

  The best way to develop user interfaces is a _productive_ way of developing.

  The best way to develop user interfaces creates _beautiful_ applications.

  The best way to develop user interfaces creates _fast_ applications.

  The best way to develop user interfaces enables developers to create applications _fast_.

  The best way to develop user interfaces is _extensible_, so that we are not a barrier to developers.


* ## 🔎 Focus on the user and all else will follow.

  Our first priority is to our user.

  Caring about the user means having high quality support for accessibility, top performance, stability, high fidelity and compatibility with the user's platform, supporting low-end devices, and so forth.

  We respect our users, whoever they are.

  Another way to phrase this is "Build a thing people want".

* ## 📖 Openness

  justapenguin_ca is an open source project, in the full senses of the word: we are open to ideas, we are open to contributions, our code and our roadmap are open, our priorities are open. Transparency leads to a higher quality product.

* ## 💫 Maintaining quality

  A mediocre product cannot be the best way to develop user interfaces, so we must build processes around maintaining high levels of quality.

  This manifests in various ways. One is that we are feature-driven, not date-driven: we do not plan work based on deadlines. We may sometimes host events where we announce new features, but these events will announce features that have become available, rather than the features becoming available in order to be announced. This means sometimes a feature we intended to announce will slip and not be announced, but we prefer this to announcing a rushed feature.

  We may sometimes gate features behind flags until we are confident of their quality.


* ## 🤣‬ Have fun doing it

  Last, but definitely not least, we want to make sure that our work environment is pleasant for everyone involved. Your health and the health of your family and friends is more important than justapenguin_ca. Our community [is welcoming](CODE_OF_CONDUCT.md). We don't know everything; all of us can make mistakes.

  We want team members to feel empowered to make changes to the code and to our processes.

  We encourage a bias towards action. It's better to try something and be wrong, than to plan forever and never execute.

* # Support

  When we think about whether we claim to "support" something, e.g. whether justapenguin_ca supports Windows 7, we use the following frame of reference. We document [which platforms we consider to fall into each category](Supported_platforms.md).

* ### Areas of support

  We distinguish several categories along which one can describe a level of support:

  * Supporting for deployment (we support a platform for deployment if you can run release builds of applications on that platform).
  * Supporting for _development_ (we support a platform for development if you can run debug builds of applications on that platform, connect them to a debugger, hot reload, view logs, and so forth).
  * Supporting for justapenguin_ca development (we support a platform for justapenguin_ca development if one can contribute to justapenguin_ca itself from that platform).

  The list of supported platforms on example.com is describing the platforms supported for deployment.

* ### Levels of support

  For each area, we consider the level to which we provide support:

  1. We will make a best effort to ensure that well written code works (e.g. we have testing on that platform). This is a common level for target platforms that have reached a label of "stable" on devices that are widely available.

  2. We will not go out of our way to prevent code from working, but if it works it's because of circumstances and our best intentions rather than a coordinated effort (e.g. we do no testing on that platform). This is a common level of support for less commonly-used devices. This corresponds to the "Best effort platforms tested by the community" category on the list of supported platforms.

  3. We will pay no attention to whether code works, but we will accept patches that are easy to reason about. This is a common level of support for the many esoteric embedded platforms that we have no way to even manually test. For example, if you have your own SoC and are running justapenguin_ca, we want you to succeed but we don't have any way to ensure it keeps working. At this level, we would not accept what we consider "risky" PRs, or PRs that involve significant refactorings. If you are willing to provide reliable CI support for your platform, we are more than happy to work with you to move that platform to level 2 (at which point more invasive PRs become viable).

  4. We won't accept patches. This is the appropriate response for features and platforms that are wildly outside our roadmap. For example, maintaining a Rust port of the framework is not something the justapenguin_ca project would accept patches for. This corresponds to the "Unsupported platforms" category on the list of supported platforms.


***

* _See also:_

  * [Code of Conduct](CODE_OF_CONDUCT.md)
  * [Contributor Guide](CONTRIBUTING.md)

Helping out in the issue database
---------------------------------

Triage is the process of going through bug reports and determining if they are valid, finding out
how to reproduce them, catching duplicate reports, and generally making our issues list
useful for our engineers.

If you want to help us triage, you are very welcome to do so!

1. Read [our code of conduct](CODE_OF_CONDUCT.md), which stipulates explicitly
   that everyone must be gracious, respectful, and professional. If you're helping out
   with triage, you are representing the justapenguin_ca team, and so you want to make sure to
   make a good impression!

<!-- Help out as described in our wiki: https://github.com/lurkydismal/justapenguin_ca/wiki/Triage -->

2. You won't be able to add labels at first, so instead start by trying to
   do the other steps, e.g. trying to reproduce the problem and asking for people to
   provide enough details that you can reproduce the problem, pointing out duplicates,
   and so on.

3.
    * `P4` means "important bug", and each level above `P4` (from `P3` to `P0`) is an order of magnitude higher importance.
    * If you have permission, assign bugs to yourself if you're working on them.
    * Unassign bugs that you are not working on soon.
    * If an issue is not assigned, assume it is available to be worked on.


Quality Assurance
-----------------

One of the most useful tasks, closely related to triage, is finding and filing bug reports. Testing
beta releases, looking for regressions, creating test cases, adding to our test suites, and
other work along these lines can really drive the quality of the product up. Creating tests
that increase our test coverage, writing tests for issues others have filed, all these tasks
are really valuable contributions to open source projects.

If this interests you, you can jump in and submit bug reports without needing anyone's permission!
We're especially eager for QA testing when we announce a beta release.

With each beta we need to test that there are no regressions. We have lots of automated tests, but sometimes the thing that breaks is something we hadn't thought to test (or haven't figured out how to test) and so human testing is important!

If you want to contribute test cases, you can also submit PRs. See the next section
for how to set up your development environment.


Developing for justapenguin_ca
----------------------

If you would prefer to write code, you may wish to start with our list of [good first contributions](https://github.com/lurkydismal/justapenguin_ca/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+contribution%22).

To develop for justapenguin_ca, you will eventually need to become familiar
with our processes and conventions. This section lists the documents
that describe these methodologies. The following list is ordered: you
are strongly recommended to go through these documents in the order
presented.

1. [Tree hygiene](Tree_hygiene.md),
   which covers how to land a PR, how to do code review, how to
   handle breaking changes, how to handle regressions, and how to
   handle post-commit test failures.

2. [Our style guide](Style_guide_for_justapenguin_ca_repo.md),
   which includes advice for designing APIs for justapenguin_ca, and how to
   format code in the app.

3. [justapenguin_ca design doc template](Template.md),
   which should be used when proposing a new technical design. This is a good
   practice to do before coding more intricate changes.
   See also our [guidance for writing design docs](Design_Documents.md).


Releases
--------

If you are interested in participating in our release process, which may involve writing release notes and blog posts, coordinating the actual
generation of binaries, updating our release tooling, and other work of that nature, then please contact [@example](https://example.com/).
