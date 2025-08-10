---
layout: post
title: structure and bonding
description: ''
date: '2022-07-25'
categories: organic-chemistry
note: 之後有空把 p5 多個顏色，p5 的 structure 應該用 class 來抓 component，不應該是用 id，不過應該先了解 class 在前端 component 的意義是什麼，平常日的 computer day 可以來做；還要修 mathjax
mathjax: true
mermaid: true
threeJS:
anchor:
publish: true
---

## Introduction

Reviewing atoms, bonds, and molecular geometry.

* nucleus
* orbitals
* electron
* bonding

## Why?

* Anyone with a curiosity about life and living things must first understand organic chemistry
* Organic chemistry is the study of carbon compounds

## How?

<div class="mermaid">
graph LR
  id1((atom)) --> id2((nucleus))
  id1((atom)) --> id3((electrons))

  id2((nucleus)) --> id4((protons))
  id2((nucleus)) --> id5((neutrons))

  id3((electrons)) --> id6[orbitals]
  id3((electrons)) --> id7[bonding]
</div>

### Nucleus

* a dense, positively charged nucleus
  * subatomic particles called protons, which are positively charged
  * neutrons, which are electrically neutral
* surrounded at a relatively large distance by negaively charged electrons
* number of positive protons in the nucleus = number of negative electrons

<div id='atom' class='h-screen justify-center items-center'>
  <div id='atom_toggle_erase' class=''></div>
  <div id='atom_image_save' class=''></div>
  <div id='atom_canvas' class='border'></div>
</div>

<script>
  const atom_id = 'atom'
  let atom = p5Draw('atom')
  let atomP5 = new p5(atom, atom_id);
</script>

* the number of protons = Z
* the mass number = A = total number of protons plus neutrons
* atomic number: 1 for hydrogen, 6 for carbon, 15 for phosphorus, and so on but different mass numbers depending on neutrons
  * Atoms with the same atomic number but different mass numbers are called isotopes

### Orbitals

* four different kinds: s, p, d, and f, each with a different shape. s looks like a ball; p looks like a dumbbell; d looks like flower (the real shape of orbitals is too hard to draw, refer to [Orbitals: Crash Course Chemistry #25](https://www.youtube.com/watch?v=cPDptc0wUYI) for further information)
* stastically, electron spends 90% to 95% of its time in an orbitals, derived from quantum mechanical model
* hybridiztion: the orbitals will not overlap
* multiple orbitals forms electron shells; for example, first shell has one s, denoted as 1s; second shell has one s and three p, denoted as 2s + 2p; third shell has one s, three p, and five d, denoted as 3s + 3p + 5d and so on
* each orbital can hold 2 electrons, so first shell can hold 2 electrons, second shell can hold 8 electrons, and third shell can hold 18 electrons
* we can simplify electron shell to concentric circles as follow

<div id='electron_shell' class='h-screen justify-center items-center'>
  <div id='electron_shell_toggle_erase' class=''></div>
  <div id='electron_shell_image_save' class=''></div>
  <div id='electron_shell_canvas' class='border'></div>
</div>

<script>
  const electron_shell_id = 'electron_shell'
  let electron_shell = p5Draw('electron_shell')
  let electronShellP5 = new p5(electron_shell, electron_shell_id);
</script>

### Electron

Electrons follow ground-state electron configuration, a lowest-energy arrangement, which is most stable arrangement; when an electron comes, it goes to the place with lowest energy.

Three rules:

* **Aufbau principle**: the lowest-energy orbitals fill up first, so the order: 1s -> 2s -> 2p -> 3s -> 3p -> 4s -> 3d, ... Noted that it does not follow the order of electron shells but rather the energy level
* **Pauli exclusion principle**: one orbital can only contain 2 electrons at most and these 2 electrons must have opposite spins (math result)
* **Hund’s rule**: for most stable structure, when two or more orbitals with equal energy available such that 2p has three orbitals with equal energy, electrons occupy each orbital with spins parallel until all orbitals are half-full and then start to full these orbitals

Given the rules, the order of filling electrons in each orbitals:

<figure>
  <img src="/assets/img/electron_configuration.png" alt="">
  <figcaption>image source: https://terpconnect.umd.edu</figcaption>
</figure>

and the detail arrangement of 1s 2s 2p 3s:

<div id='electron_detail_arrangement' class='h-screen justify-center items-center'>
  <div id='electron_detail_arrangement_toggle_erase' class=''></div>
  <div id='electron_detail_arrangement_image_save' class=''></div>
  <div id='electron_detail_arrangement_canvas' class='border'></div>
</div>

<script>
  const electronDetailArrangementId = 'electron_detail_arrangement'
  let electronDetailArrangementP5 = new p5(p5Draw(electronDetailArrangementId), electronDetailArrangementId);
</script>

### bonding

* Atoms bond together because of more stable state compared to separation
* Energy flows out when a bond forms
* All atoms tried to be more stable; noble gas has most stable status by nature
  * He ($$1s^2$$)
  * Ne ($$1s^2 2s^2 2p^6$$)
  * Ar ($$1s^2 2s^2 2p^6 3s^2 3p^6$$)
  * Kr (1s²2s²2p⁶2s²3p⁶3d¹⁰4s²4p⁶) (abbreviated as 3d¹⁰4s²4p⁶)
* spectrum of bonding

<div id='spectrum_of_bonding' class='h-screen justify-center items-center'>
  <div id='spectrum_of_bonding_toggle_erase' class=''></div>
  <div id='spectrum_of_bonding_image_save' class=''></div>
  <div id='spectrum_of_bonding_canvas' class='border'></div>
</div>

<script>
  const spectrum_of_bondingId = 'spectrum_of_bonding'
  let spectrum_of_bondingP5 = new p5(p5Draw(spectrum_of_bondingId), spectrum_of_bondingId);
</script>

Atoms achive ionic bond by transfering electrons and achive covalent bond by sharing electrons. With **electronegativity**, we can determine whether this bond is ionic, covalent, or polar covalent.

#### electronegativity

electronegativity (EN) is the ability of an element to attract shared electons and the values as follow:

<figure>
  <img src="/assets/img/electronegativity.png" alt="">
  <figcaption>image source: McMurry Organic Chemistry</figcaption>
</figure>

Roughly,

* nonpolar covalent: electronegativities differ by less than 0.5
* polar covalent: electronegativities differ by 0.5–2
* ionic: electronegativities differ by more than 2

#### ionic bond

example ($$NaCl$$): $$Na$$ ($$1s^2 2s^2 2p^6 3s^1$$) can achieve more stable status by losing one electron ($$1s^2 2s^2 2p^6$$ just like Ne) to $$Na^+$$ and $$Cl$$ ($$1s^2 2s^2 2p^5$$) can achieve more stable status by gaining one electron ($$1s^2 2s^2 2p^6$$ just like Ne) to $$Cl^-$$

#### polar covalent bond

example ($$HCl$$): TBC

#### nonpolar covalent bond

example ($$CH_4$$): it takes too much energy for C ($$1s^2 2s^2 2p^2$$) to lose 4 electrons or gain 4 electrons, so to be more stable, C will share the electrons with other atoms such as four $$H$$ and we called this stable substance as **molecule** and we can draw it as follow:

<div id='ch4' class='h-screen justify-center items-center'>
  <div id='ch4_toggle_erase' class=''></div>
  <div id='ch4_image_save' class=''></div>
  <div id='ch4_canvas' class='border'></div>
</div>

<script>
  const ch4Id = 'ch4'
  let ch4P5 = new p5(p5Draw(ch4Id), ch4Id);
</script>

* **valence bond theory** explains covalent bond: two atoms approach -> orbital with single electoron overlaps the other atom's orbital with single electron
  * example: ($$2H.$$ -> $$H_2$$) -> release energy, 436 kJ/mol and the best distance between atoms is 74pm
  * Given both H. is $$1s^1$$, it has no doubt that both H share their electrons the other 1s, making them both $$1s^2$$ and the shapes looks like

(add the egg shapes of H_2 here)

#### **hybrid orbitals for bonding**

explains the concept of mixed orbitals ready to bond (refer to [this](https://www.youtube.com/watch?v=vHXViZTxLXo&t=11s))
  
* $$sp^3$$ = s + p + p + p

<div id='sp3' class='h-screen justify-center items-center'>
  <div id='sp3_toggle_erase' class=''></div>
  <div id='sp3_image_save' class=''></div>
  <div id='sp3_canvas' class='border'></div>
</div>

<script>
  const sp3Id = 'sp3'
  let sp3P5 = new p5(p5Draw(sp3Id), sp3Id);
</script>

* $$sp^2$$ = s + p + p

<div id='sp2' class='h-screen justify-center items-center'>
  <div id='sp2_toggle_erase' class=''></div>
  <div id='sp2_image_save' class=''></div>
  <div id='sp2_canvas' class='border'></div>
</div>

<script>
  const sp2Id = 'sp2'
  let sp2P5 = new p5(p5Draw(sp2Id), sp2Id);
</script>

* $$sp$$ = s + p

<div id='sp' class='h-screen justify-center items-center'>
  <div id='sp_toggle_erase' class=''></div>
  <div id='sp_image_save' class=''></div>
  <div id='sp_canvas' class='border'></div>
</div>

<script>
  const spId = 'sp'
  let spP5 = new p5(p5Draw(spId), spId);
</script>

  * example ($$CH_4$$): C is $$2s^22p^2$$, desired to share these four electrons. Although there are 2 electrons in 2s and 2 electrons in 2 p orbitals out of $$2p$$, when C shares the electrons with the other 4 H, the shape of the bonding orbitals will be $$sp^3$$ which looks like

(draw CH_4)

    * example ($$NH_3$$):

(draw NH_3)

    * example ($$H_2O$$):

(draw H_2O)

also explain pi and sigma bond

  * $$sp^2$$ = s + p + p
    * example ($$C_2H_4$$): (to be continued)

(draw C_2H_4)

  * $$sp$$ = s + p
    * example ($$C_2H_2$$): (to be continued)

(draw C_2H_2)

#### 

## What?

### ground-state electron configuration of Oxygen

<div id='electron_configuration_of_oxygen' class='h-screen justify-center items-center'>
  <div id='electron_configuration_of_oxygen_toggle_erase' class=''></div>
  <div id='electron_configuration_of_oxygen_image_save' class=''></div>
  <div id='electron_configuration_of_oxygen_canvas' class='border'></div>
</div>

<script>
  const ElectronConfigurationOfOxygenId = 'electron_configuration_of_oxygen'
  let ElectronConfigurationOfOxygenP5 = new p5(p5Draw(ElectronConfigurationOfOxygenId), ElectronConfigurationOfOxygenId);
</script>

### Predicting the Number of Bonds ($$PH_?$$)

In period table,

* P is the 15th element -> $$1s^2 2s^2 2p^6 3s^2 3p^3$$ -> P needs three more electrons to achieve noble gas
* H is the 1th element -> $$1s^2$$ -> H needs one more electron to achieve noble gas

-> $$PH_3$$

### draw CH3CH2CH3 and predict the value of each bond angle and the shape of each molecule

<div id='CH3CH2CH3' class='h-screen justify-center items-center'>
  <div id='CH3CH2CH3_toggle_erase' class=''></div>
  <div id='CH3CH2CH3_image_save' class=''></div>
  <div id='CH3CH2CH3_canvas' class='border'></div>
</div>

<script>
  const CH3CH2CH3Id = 'CH3CH2CH3'
  let CH3CH2CH3P5 = new p5(p5Draw(CH3CH2CH3Id), CH3CH2CH3Id);
</script>

### the number of H in carvone

<div id='carvone' class='h-screen justify-center items-center'>
  <div id='carvone_toggle_erase' class=''></div>
  <div id='carvone_image_save' class=''></div>
  <div id='carvone_canvas' class='border'></div>
</div>

<script>
  const carvoneId = 'carvone'
  let carvoneP5 = new p5(p5Draw(carvoneId), carvoneId);
</script>

[answer](https://study.com/academy/answer/draw-a-line-bond-structure-for-propane-ch3ch2ch3-predict-the-value-of-each-bond-angle-and-indicate-the-overall-shape-of-the-molecule.html#:~:text=Hence%2C%20the%20overall%20shape%20of,combination%20of%20three%20tetrahedral%20structures.)

## Reference

McMurry Organic Chemistry

[Orbitals: Crash Course Chemistry #25](https://www.youtube.com/watch?v=cPDptc0wUYI)

[Electron shell](https://en.wikipedia.org/wiki/Electron_shell)

[Electron configuration](https://en.wikipedia.org/wiki/Electron_configuration)

[罕德定則（Hund’s rule](https://highscope.ch.ntu.edu.tw/wordpress/?p=3485)

[Hybrid Orbitals explained - Valence Bond Theory | Orbital Hybridization sp3 sp2 sp](https://www.youtube.com/watch?v=vHXViZTxLXo&t=11s)
