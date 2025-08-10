---
layout: post
title:
description: ''
date: '2022-08-28'
categories: chemistry
note: 這篇其實完全就是解題技巧
mathjax: true
mermaid: true
p5:
threeJS:
anchor:
publish: true
---

## Introduction

## Why?

## How?

### 

This article explains the concept of Stoichiometry. After we balance chemical reaction, there are actually 9 ways of examples; for example, we know $$SO_2$$ + $$O_2$$ = $$SO_3$$.

step 1: balance

$$2SO_2 + O_2 \rightarrow 2SO_3$$

step 2: proportion

$$SO_2 : O_2 : SO_3 = 2 : 1 : 2$$

step 3: convert from A to B

<div class="mermaid">
graph LR
  id1(particle A) --1_mole_A / N_A--> id4(mole A)
  id2(mass A) --1_mole_A / mole_mass_A--> id4(mole A)
  id3(volume A) --1_mole_A / 22.4_L_A--> id4(mole A)

  id4(mole A) --coeff_B / coeff_A--> id5(mode B)

  id5(mode B) --N_A / 1_mole_B--> id6(particle B)
  id5(mode B) --mole_mass_A / 1_mole_B--> id7(mass B)
  id5(mode B) --22.4_L_B / 1_mole_B--> id8(volume B)
</div>

* particle A -> particle B
  * Question: How many moles of $$SO_3$$ is produced if react 5 moles of $$O_2$$?
  * Answer: Because $$SO_3: O_2 = 2: 1$$, it will produce 10 moles of $$SO_3$$
* particle A -> mass B
  * Question: How many grams of $$SO_3$$ is produced if react 5 moles of $$O_2$$?
  * Answer: Because $$SO_3: O_2 = 2: 1$$, it will produce 10 moles of $$SO_3$$, which is 400 grams
* particle A -> volumn B
* mass A -> particle B
* mass A -> mass B
  * How many grams of $$SO_3$$ is produced if react 32 grams of $$O_2$$?
  * Moles of 32 grams of $$O_2$$ = 32/16 = 2 -> 4 moles of $$SO_3$$ -> 4 * (32 + 16 * 3) = 320 g
* mass A -> volumn B
* volumn A -> particle B
* volumn A -> mass B
* volumn A -> volumn B

## What?

One real-world example of using stoichiometry is determining the amount of gasoline needed to fuel a car for a given distance. By knowing the chemical equation for combustion of gasoline (C8H18 + 25/2 O2 → 8 CO2 + 9 H2O), the mass of gasoline consumed can be calculated from the amount of carbon dioxide and water produced during combustion. This calculation can help to optimize fuel efficiency and reduce harmful emissions.

## Reference

Chemistry, Zumdahl

[Stoichiometry Basic Introduction, Mole to Mole, Grams to Grams, Mole Ratio Practice Problems](https://www.youtube.com/watch?v=7Cfq0ilw7ps)

[Stoichiometry Tutorial: Step by Step Video + review problems explained | Crash Chemistry Academy](https://www.youtube.com/watch?v=XnfATaoubzA)
