# Title

## Purpose

## Concept

### Prisoner Dilemma

| P1 \ p2 | Confess | Silent |
| :---  | :----: | :---: |
| Confess | 4 \ 4 | 1 \ 5 |
| Silent | 5 \ 1 | 2 \ 2 |

* ISP routing game: There are two ISP both do not know their counterpart's strategy. 
  ```mermaid
  graph TD
    subgraph ISP1
      core1(core1)
      s1(s1)
      t2(t2)
    end

    c(transit point C)
    s(transit point S)

    subgraph ISP2
      core2(core2)
      s2(s2)
      t1(t1)
    end
    
    s1 <---> c
    s2 <---> c
    core1 <---> s1
    core1 <---> s
    core2 <---> s2
    core2 <---> s
    t1 -.- s
    t2 -.- s
  ```
  * Note that t1 and t2 are extremely near transit pint S.
  * Explanation: ISP 1 would like to send information from s1 to t1. In big picture, ISP 1 should use transit point S because the total cost would be 2 (core 1 -> transit point S -> t1). However, it means all the cost lies on ISP 1. Given both ISPs just want to send the information to their counterpart at lowest cost, ISP 1 would choose the route (s1 -> C) and let ISP 2 to do the rest job. As a result, the total cost would be 4, which is worse as a whole.

### Tragedy of Commons

#### Pollution game

The Pollution Game is a simplified version of the Tragedy of the Commons, often used in economics and game theory to illustrate the dynamics of environmental degradation caused by individual self-interest.

In the Pollution Game, imagine a scenario where multiple factories are located on the banks of a river, and each factory has the choice to either pollute or clean up its waste before discharging it into the river. The river serves as a shared resource, and the pollution level in the river affects all factories downstream.

* Players: There are multiple players, representing the factories located along the river.
* Actions: Each player has two actions to choose from:
  * Pollute: The player can choose to discharge its waste into the river without treating it, leading to increased pollution.
  * Clean Up: The player can choose to invest in pollution control measures to treat its waste before discharging it into the river, reducing pollution levels.
* Payoffs: The payoffs for each player depend on the collective actions of all players:
  * If all players choose to clean up (cooperate), the river remains clean, benefiting everyone with a high payoff.
  * If a player chooses to pollute while others clean up, that player benefits from lower costs but imposes costs on others due to increased pollution downstream.
  * If all players choose to pollute (defect), the river becomes highly polluted, resulting in low payoffs for everyone due to the environmental damage.
* Model:
  * Pollution control has a cost of 3 for each firm. If other firms pollutes the river, they add 1 cost to the other firms. Suppose k firms choose not to control pollution. Then these k firms have k cost and the other n-k firms have k+3 cost.
  * If a firm choose not to control pollution, it will have k+3 cost; however, if the firm choose pollute the river, it will have k cost. As a result, it will choose pollution. In the end, all the firms' cost will be n because all the firms choose pollution.

The key insight from the Pollution Game is that individual rationality (choosing to pollute) often leads to a collectively undesirable outcome (high pollution), similar to the Tragedy of the Commons. However, if players can coordinate their actions and cooperate by investing in pollution control measures, they can achieve a better outcome for all.

#### Tragedy of the commons

There are contradiction between a player's benefit and the total benefits of other players.

Say there is a bandwidth with maximum capacity of 1. Each player i send `x_i` amount of data. As a result, all users benefit will be 0 if

$$\sum_j(x_j) > 1$$

And it is also straight forward to formulate the return of player_i among other players as

$$x_i(1 - \sum_j(x_j))$$

where

$$\sum_n(x_n) < 1$$

Let's get the steady state. Say the total benefit of all the other player is `t` and at the same time player send x amount of data, then the benefit of player i would be

$$x(1 - t - x)$$

Then the maximum benefit would occur when

$$x_i = \frac{1 - \sum_(j!=i)(x_j)}{2}$$

Say all players have the same benefit, then you will find

$$x_i = \frac{1}{(1+n)}$$

### Coordination Games

A basic coordination game entails two participants who have two choices to make, with the objective of making the same selection.

#### Battle of The Sexes

Boys prefer baseball and girls prefer softball, but they need each other so that they can play the game. So the payoff:

| Girl \ Boy | Baseball | Softball |
| :---  | :----: | :---: |
| Baseball | 5 \ 6 | 1 \ 1 |
| Softball | 2 \ 2 | 6 \ 5 |

Given girls choose softball, boys will choose softball. Also, given girls choose baseball, boys choose baseball. There are two Nash Equ. both baseball or both softball.

#### Randomized Strategies

| 1 \ 2 | Head | Tail |
| :---  | :----: | :---: |
| Head | 1 \ -1 | -1 \ 1 |
| Tail | -1 \ 1 | 1 \ -1 |

No pure Nash Equilibrium.

### Mathematically Define Games

There are n players, {1, 2, ..., n}. Each player has his own set of strategies, Si. User i will choose a strategy, si, from Si. Player i has preference by his payoff (ui) and cost (ci) where

$$u_i: S -> R$$

and

$$c_i: S -> R$$

and actually payoff and cost are interchangeable; that is,

$$u_i(s) = -c_i(s)$$

### Dominant Strategy Solution

A strategy vector

$$s \in S$$

is a dominant strategy solution, if for each player $i$ and each alternative strategy vector

$$s' \in S$$

we have

$$u_i(s_i, s'_{-i}) >= u_i(s'_i, s'_{-i})$$

A dominant strategy means that each player has a strategy that is better than all other strategies, regardless of what the other players do. In other words, a player's dominant strategy yields a higher payoff than any other strategy, no matter what the strategies chosen by the other players are.

#### Vickrey's mechanism

Given the payoff = value - price

If a player has highest bid -> win the game -> pay the second highest bid -> Player has $v$ value on this object

* bid price as player's value
  * second highest bid > player's value -> payoff = 0
  * second highest bid < player's value -> payoff > 0
* bid price lower than player's value
  * second highest bid > bid price -> payoff = 0
  * second highest bid < bid price -> payoff > 0
* bid price higher than player's value -> payoff < 0 (impossible)

To make the player bid price lower than this player's own value, he need to know the other player's value first. Given this player does not know it, the biding price will gradually increase. -> Bid this player's own value.

Given all players' strategy is to bid their own value -> dominant strategy.

## Reference

[algorithmic-game-theory](https://www.cs.cmu.edu/~sandholm/cs15-892F13/algorithmic-game-theory.pdf)
