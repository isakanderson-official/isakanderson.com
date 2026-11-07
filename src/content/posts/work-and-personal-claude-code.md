---
title: Switching between work and personal Claude Code accounts
date: 2026-11-07
description: Two short aliases so I can jump between my work and personal Claude Code accounts without logging in and out.
tags: [dev]
---

I use Claude Code for work and for my own projects, and those are two different accounts. For a while that meant logging out of one and back into the other every time I switched, which was not too bad but did add friction.

So I set up two aliases, `ccw` for work and `ccp` for personal. During work hours I type `ccw`, and in the evening when I'm messing with my own stuff I type `ccp`. No logging in or out.

For a while I was using my personal computer for both work and personal stuff, which is why I needed this in the first place. I've since gotten a dedicated work computer, so this setup isn't really necessary for me anymore, but if you find yourself in the same spot this article's for you.

## The setup

The whole thing is three lines in `~/.zshrc` (I'm on mac):

```zsh
alias ccw='CLAUDE_CONFIG_DIR=~/.claude-work ~/.local/bin/claude'
alias ccp='CLAUDE_CONFIG_DIR=~/.claude-personal ~/.local/bin/claude'
alias claude="echo 'Use ccw (work) or ccp (personal)'"
```

The trick is `CLAUDE_CONFIG_DIR`. By default Claude Code keeps everything in `~/.claude`, and this env var points it somewhere else instead. That folder holds the login, settings, session history, project memory, and MCP servers, so giving each account its own folder means each one stays logged in on its own and they don't really know about each other.

The aliases call the full path to the binary instead of just `claude`. That's because the third line overrides `claude` itself to print a reminder, so if I type plain `claude` out of habit I get nudged to pick one instead of landing in the wrong account.

After adding them, run `source ~/.zshrc` (or open a new terminal window), then run `ccw` and `ccp` once each and log in to the right account in each. After that they stay logged in.

## Why I like it

- **Switching is instant** - no `/logout`, no browser login flow, just a different command.
- **Faster to launch** - three letters is quicker to type than `claude` anyway, and I always know which account I'm opening.
- **Work stays work** - project memory, history, and settings for work don't mix with my personal stuff, which I think matters more than it sounds once Claude starts remembering how you like things done.
- **Separate usage limits** - each account tracks its own usage, so I can tell what's going where.
- **Different settings per account** - work can have its own MCP servers and permissions without cluttering my personal setup.

## Bonus tips

Since each alias points to its own config folder, anything you had in `~/.claude` doesn't come along automatically. The one that got me was my global `CLAUDE.md`, the file with my personal instructions. Claude Code now reads it from `~/.claude-work` or `~/.claude-personal`, not `~/.claude`.

If you want the same instructions in both, a symlink is probably the easiest fix:

```sh
ln -s ~/.claude/CLAUDE.md ~/.claude-work/CLAUDE.md
ln -s ~/.claude/CLAUDE.md ~/.claude-personal/CLAUDE.md
```

Or keep them separate if you want work and personal Claude to behave a bit differently. Same goes for things like `settings.json` and custom skills.

It's a pretty small change but it's one of those things I'm surprised I didn't do sooner. If you're juggling a work and personal account it's probably worth the two minutes 🙌
