# Title

## Introduction

When learning Japanese, it is important to grasp concepts such as tempo for understanding the rhythm of spoken words, and to master the pronunciation of long vowels which can significantly alter the meaning of words. Additionally, familiarizing oneself with sokuon (促音) or geminate consonants, correctly pronouncing loanwords, understanding the special pronunciation of unit numbers, and being aware of tone variations are all crucial aspects of language acquisition in Japanese.

## Why?

Learning the special pronunciations in Japanese, such as those of long vowels, 促音 (sokuon), loanwords, unit numbers, and tone variations, allows for accurate and nuanced communication, ensuring a deeper understanding and more authentic usage of the language.

## How

* Tempo
  * Concept: The number of tempos = The number of kana (仮名)
  * Example: The number of tempo of 図書館（としょかん）is 4
* Long vowels
* Katakana (片仮名)
  * Example: びール (びいる)
* Hiragana (平仮名)
  * Example: お母さん (おかあさん)
* Special long vowels
  * pronounce 時計 (とけい) as とけえ
  * pronounce 空港（くうこう）as くうこお
* 

(TBC, 2023/06/24)

### 促音

喫茶店（きっさてん）唸作 Ki s Sa Te N，有 5 拍，看到 Ki 有促音的符號，在 Sa 之前發 s，做為一拍。

### loanwords

demo with JSON structure as the items in a object are somehow related

1. { ティ(thi): パーティー(party), ディ(dhi): シーディー(CD) }
2. { ファ(fa): '', フィ(fi): '', フェ(fe): '', フォ(fo): '' }
3. { ヴァ(va): '', ヴィ(vi): '', ヴ(vu): '', ヴェ(ve): '',　ヴォ(vo): '' }
4. { シェ(she): '', チェ(che): '', ジェ(je) :ジェっトき(jet 機) }

### special pronouncation of unit numbers

The common relationship between numbering and measure words:

* regular
  * example: １台(いちだい)、２台(にだい)、３台(さんだい)、四台(よんだい)、5台(ごだい)、6台(ろくだい)、7台(ななだい)、８台(はちだい)、９台(きゅうだい)、10台(じゅうだい)、何台(なんだい)
  * example: 一つ(ひとつ)、二つ(ふたつ)、三つ(みっつ)、四つ(よっつ)、五つ(いつつ)、六つ(むっつ)、七つ(ななつ)、八つ(やっつ)、九つ(ここのつ)、十(とお)、幾つ(いくつ)
* start with k and p
  * use 促音 in number of 1, 6, 8, 10
  * example: **１個(いっこ)**、２個(にこ)、３個(さんこ)、４個(よんこ)、５個(ごこ)、**６個(ろっこ)**、７個(ななこ)、**８個(はっこ)**、九個(きゅうこ)、**１０個(じゅっこ)**、何個(なんこ)
* start with h
  * use 促音 in number of 1, 6, 8, 10 and following the measure word in 半濁音
  * use 濁音 in measure word after 3, 何
  * example: **１本(いっぽん)**、２本(にほん)、**３本(さんぼん)**、４本(よんほん)、５本(ごほん)、**６本(ろっぽん)**、７本(ななほん)、**８本(はっぽん)**、９本(きゅうほん)、**１０本(じゅっぽん)**、**何本(なんぼん)**
* start with t and s
  * use 促音 in number of 1, 8, 10
  * example: **一頭(いっとう)**、二頭(にとう)、三頭(さんとう)、四頭(よんとう)、五頭(ごとう)、六頭(ろくとう)、七頭(ななとう)、**八頭(はっとう)**、九頭(きゅうとう)、**十頭(じゅっとう)**、何頭(なんとう)
* add も to express emphasis; example: にとうも

#### example

* regular

```
{
  for machine: 台 (だい),
  for flat objects: 枚 (まい),
  for behavior times: 度 (ど),
  for people: 名 (めん),
  for train: 両 (りょう),
  for indexing: 番 (ばん)
  ...
}
```

* start with k and p

```
{
  objects: 個 (こ),
  behavior times: 回 (かい),
  page: ページ,
  floor: 階 (かい), // it follows the regularity of h
  ...
}
```

* start with h

```
{
  long object: 本 (ほん),
  small animal: 匹 (ひき),
  cup: 杯 (はい),
  hundred: 百 (ひゃく)
  ...
}
```

* start with t and s

```
{
  big animal: 頭 (とう),
  clothes: 着 (ちゃく),
  books: 冊 (さつ),
  goods: 点 (てん),
  letter: 通 (つう),
  building: 棟 (とう),
  shoes: 足 (そく),
  boat: 艘 (そう),
  ferry: 隻 (せき),
  company: 社 (しゃ),
  age: 歳 (さい)
}
```

### tone

There are many pitch-accent in Japan and we follow the standard way. We use numbering to represent the tones as follow:

1. `1` means lower the tone right after the first letter
2. `2` means lower the tone right after the second letter and we need to raise the tone after the second letter so that we can lower the tone after second letter
3. `3` means lower the tone right after the third letter and also we need to raise the tone after the second letter and keep the tone up until the third letter
4. `4` means lower the tone right after the forth letter
5. `0` means there is no position to lower the tone, meaning the tone is always high after the first letter

#### sentence

1. pronounce subsidiary and the noun together and subsidiary follows the tone of the last letter of noun
2. The number of 胃(い) is 0 and the number of 目(め) is 1, they have different effects to the tone of subsidiary; the tone of は after 胃 should be higher but the tone of は after 目 should be lower.

## reference

[Japanese pitch accent](https://en.wikipedia.org/wiki/Japanese_pitch_accent)
