---
layout: post
title:
description: ''
date: '2022-08-21'
categories: chemistry
note:
mathjax: true
mermaid: true
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes fundamental knowledge and skills in science as follow:

* scientific method
* unit of measurements
* measurement
* dimensional analysis
* matter & mixture

## Why?

focus on why we need it

## How?

### scientific method

<div class="mermaid">
graph LR
  id1((observation)) --> id2((ask why))
  id2((ask why)) --> id3((setup hypothesis))
  id3((setup hypothesis)) --> id4((experiment))
  id4((experiment)) -- not found, refine --> id3((setup hypothesis))
  id4((experiment)) -- found --> id5((conclusion))
  id5((conclusion)) --> id6((law))
  id5((conclusion)) --> id7((theory<br>model))
  id7((theory<br>model)) --> id8((prediction))
  id8((prediction)) --compare with--> id1((observation))
</div>

* law summarizes what happens; for example, law of conservation of mass: chemical change does not affect total mass of materials
* theory explains why it happens

### unit of measurements

SI means Système International

#### SI units

| physical quantity | name of unit | abbreviation |
| :--- | :----: | ---: |
| mass | kilogram | kg |
| length | meter | m |
| time | second | s |
| temperature | kelvin | K |
| electric current | ampere | A |
| amount of substance | mole | mol |
| luminous intensity | candela | cd |

#### prefixes in SI system

TBC

### measurement

* uncertainty: occuring because of the precision of the measuring device
* significant figures: recording the certain digits and the first un- certain digit
* accuracy and precision
  * accuracy: how close a given set of measurements are to their **true value**
  * precision: how close the measurements are to **each other**
* random and system error
  * random: unpredictable and cannot be replicated by repeating experiments
  * system: consistent errors in experiments
* exponential notation: 6234000 -> $$6.234 * 10^6$$

### dimensional analysis

Dimensional analysis make sure the result is reasonable. For example, a men's speed is $$10 m/s$$, then after 10 seconds, he will walk

$$10 m/s * 10s = 100m$$

we ensure the result by dimensional analysis as $$m/s * s = m$$, making the result 10 m is truly distance of walking.

### matter & mixture

<div class="mermaid">
graph TD
  id1((matter)) --variable<br>composition--> id2((mixture))
  id1((matter)) --not<br>variable<br>composition--> id3((pure substances))

  id2((mixture)) --visbly<br>distinguishable--> id4((Heterogeneous))
  id2((mixture)) --not<br>visbly<br>distinguishable--> id5((Homogeneous))

  id3((pure substances)) --various<br>atoms--> id6((compound))
  id3((pure substances)) --no<br>various<br>atoms--> id7((element))
</div>

* Matter can exist in solid, liquid, gas
* seperate mixtures physically through distillation, filtration, chromatography
* decompose compound to elements through chemical changes

## What?

TBC (should practice some examples)

## Note

Section 1.9
matter
states (of matter) homogeneous mixture

## Reference

Chemistry, Zumdahl

[The scientific method](https://www.youtube.com/watch?v=N6IAzlugWw0)
