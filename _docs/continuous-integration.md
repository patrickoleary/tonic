---
layout: docs
title: Continuous Integration
prev_section: contributing
next_section: troubleshooting
permalink: /docs/continuous-integration/
---

You can easily test your contributions using `grunt test`.
The following guide will show you how to set up a free build environment on
[Travis][0], with [GitHub][1] integration for pull requests. Paid
alternatives exist for private repositories.

[0]: https://travis-ci.org/
[1]: https://github.com/

## 1. Enabling Travis and GitHub

Enabling Travis builds for your GitHub repository is pretty simple:

1. Go to your profile on travis-ci.org: https://travis-ci.org/profile/username
2. Find the repository for which you're interested in enabling builds.
3. Click the slider on the right so it says "ON" and is a dark grey.
4. Optionally configure the build by clicking on the wrench icon. Further
   configuration happens in your `.travis.yml` file. More details on that
   below.

## 2. The Test Script

The simplest test script simply runs `grunt test` and ensures that Tonic
doesn't fail on style, unit or end-to-end tests.

## 3. Configuring Your Travis Builds

This file is used to configure your Travis builds. Below is a sample `.travis.yml`
file, and what follows that is an explanation of each line.

{% highlight yaml %}
before_install:
    - sudo apt-get install npm
install:
    - npm install -g grunt grunt-cli
    - npm install
script:
    - grunt test
{% endhighlight %}