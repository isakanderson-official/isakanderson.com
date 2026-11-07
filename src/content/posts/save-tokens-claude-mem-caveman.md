---
title: Saving 70-90% of tokens with claude-mem and caveman
date: 2026-11-09
description: Two Claude Code plugins that cut down how much Claude reads and writes, explained in plain English.
tags: [dev]
---

Want to get the most out of what you pay for, for AI usage? Two plugins ended up making the biggest difference for me, claude-mem and caveman. One cuts down what Claude has to read, the other cuts down what Claude writes back.

## Quick token refresher

Tokens are the little chunks of text Claude reads and writes, roughly 3/4 of a word each. Everything counts, your prompt, the files Claude opens, your `CLAUDE.md`, and every word of its reply. More tokens means you hit your limits sooner (or pay more if you're on the API, which I don't recommend).

The two sides:

- **Input** - everything Claude has to read before it can answer
- **Output** - everything Claude writes back

claude-mem works on the input side and caveman mostly works on the output side, which is why they pair well.

## claude-mem: memory without re-reading everything

In plain English, claude-mem gives Claude a notebook that carries over between sessions.

Normally every new Claude Code session starts from zero. Claude has no idea what you did yesterday, so it ends up re-reading the same files and re-figuring out the same things, and you pay for all of that again. claude-mem quietly watches what happens during a session (files read, edits made, commands run) and has a second, smaller model boil it down into short notes. Those get saved locally on your machine.

The token savings come from how it hands those notes back. Instead of dumping your whole history into the next session, it starts with a short index of what it remembers. Claude only pulls the full details on the specific notes it actually needs. A search result is around 50-100 tokens while a full note is more like 500-1,000, so only fetching what's relevant is where the project gets its ~10x (about 90%) savings claim on memory.

To install it, run these inside Claude Code:

```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

It needs Node 20.19+ or 22.12+. One gotcha, `npm install -g claude-mem` only installs the library and won't actually hook into Claude Code, so use the plugin commands above. Memory also kicks in starting with your second session in a project, so don't expect much the first time around.

## caveman: make Claude talk like a caveman

caveman is exactly what it sounds like. It makes Claude drop the filler and answer in short, blunt sentences. Same answer, a lot fewer words.

Here's the example from their README, a question about why a React component keeps re-rendering:

- **Normal (63 tokens):** a few sentences explaining how an inline object prop fails React's shallow comparison, then a recommendation to use `useMemo`
- **caveman (20 tokens):** "New object ref each render, so React re-renders. Wrap the prop in `useMemo`."

That's around 70% fewer tokens for the same fix. Across their broader benchmark it averaged closer to 40% fewer output tokens than normal, and around 60% with the more aggressive `/ultracave` mode.

To install it, run these inside Claude Code:

```
/plugin marketplace add JuliusBrussee/caveman
/plugin install caveman@caveman
```

It turns itself on for every session. `/caveman off` turns it off, and `/caveman status` tells you which mode you're in.

There's also `/caveman-compress`, which I think is honestly the most useful part. It rewrites your `CLAUDE.md` (or any memory file) into a shorter version and keeps a backup of the original. Since that file gets loaded into every single session, trimming it 20-50% saves tokens on literally everything you do.

## Where the 70-90% comes from

I want to be upfront here, 70-90% isn't a cut to your whole bill. It's what you save on the specific parts each tool targets. claude-mem's ~90% is on recalling past work vs. loading it all in, and caveman's ~70% is on the replies it shortens. How much that moves your overall usage depends a lot on how you use Claude. If most of your sessions are long back-and-forth conversations you'll probably notice it more than if Claude spends most of its time reading big files.

A couple other things worth knowing:

- **Telemetry** - both send usage stats by default. `npx claude-mem telemetry disable` and `caveman telemetry off` turn them off.
- **Short answers aren't always what you want** - when I'm trying to actually understand something, I turn caveman off so I get the full explanation.
- **Watch out for lookalikes** - there's a crypto token called $CMEM and a bunch of forks floating around. The real repos are [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) and [JuliusBrussee/caveman](https://github.com/juliusbrussee/caveman).

Both take a couple minutes to set up and they've helped me stretch my limits a lot further. If you're running out of usage before the week is up they're probably worth a try 🙌
