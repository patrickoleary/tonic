---
layout: docs
title: Troubleshooting
prev_section: continuous-integration
next_section: resources
permalink: /docs/troubleshooting/
---

If you ever run into problems installing or using Tonic, here are a few tips
that might be of help. If the problem you’re experiencing isn’t covered below,
please [report an issue]({{site.help_url}}/issues/new) so the
Tonic community can make everyone’s experience better.

- [Installation Problems](#installation-problems)
- [Problems running Tonic](#problems-running-Tonic)
- [Configuration problems](#configuration-problems)

## Installation Problems



## Problems running Tonic



## Configuration problems

The order of precedence for conflicting [configuration settings](../configuration/)
is as follows:

1.  Command-line commands
2.  Configuration file settings
3.  Defaults

That is: defaults are overridden by options specified in `config.json`,
and commands specified at the command-line will override all other settings
specified elsewhere.

<div class="note">
  <h5>Please report issues you encounter!</h5>
  <p>
  If you come across a bug, please <a href="{{ site.help_url }}/issues/new">create an issue</a>
  on GitHub describing the problem and any workarounds you find so we can
  document it here for others.
  </p>
</div>
