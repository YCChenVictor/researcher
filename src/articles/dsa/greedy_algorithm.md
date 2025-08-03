# title

## Purpose

Try to find a good result, not a perfect one for a problem.

## Concept

A greedy algorithm is simple: at each step, pick the optimal move.

### Radio Coverage Problem

Suppose we want to cover all states, WA, MT, ID, OR, NV, UT, CA, AZ and there are five radio stations cover these states. All radio stations have the same cost, so we are going to minimize the number of stations.

![radio states coverage](assets/img/radio_states_coverage)

which means,

| Stations | Covered States |
|---|--------
| 1 | ID, NT, UT |
| 2 | WA, ID, MT |
| 3 | OR, NV, CA |
| 4 | NV, UT |
| 5 | CA, AZ |

#### brute force

Just find all covered states of each combination of stations.The time complexity is O(2^n).

```ruby
stations = [
  '1' => Set.new(['ID', 'MT', 'UT']),
  '2' => Set.new(['WA', 'ID', 'MT']),
  '3' => Set.new(['OR', 'NV', 'CA']),
  '4' => Set.new(['NV', 'UT']),
  '5' => Set.new(['CA', 'AZ']),
]

states_needed = Set.new(['WA', 'MT', 'ID', 'OR', 'CA', 'NV', 'UT', 'AZ'])

all_combinations = [ # O(2^n), each element is either in the combination or not
  data['1'] + data['2'] + data['3'] + data['4'] + data['5'],
  data['1'] + data['2'] + data['3'] + data['5'],
  data['1'] + data['3'] + data['4'] + data['5'],
  ...
]
```

O(2^n) is too high, we can use greedy algorithm to lower the complexity.

#### Greedy Algorithm

* Pick the station that covers the most states that haven’t been covered yet. It’s OK if the station covers some states that have been covered already.
* Repeat until all the states are covered.

```ruby
# prepare data
stations = {
  '1' => Set.new(['ID', 'NT', 'UT']),
  '2' => Set.new(['WA', 'ID', 'MT']),
  '3' => Set.new(['OR', 'NV', 'CA']),
  '4' => Set.new(['NV', 'UT']),
  '5' => Set.new(['CA', 'AZ']),
}
states_needed = Set.new(['WA', 'MT', 'ID', 'OR', 'CA', 'NV', 'UT', 'AZ'])

final_stations = Set.new

while !states_needed.empty?
  best_station = nil # In each step, we will find the best station on current situation
  states_covered = Set.new

  stations.each do |station, states|
    covered = states_needed.intersection(states)

    if covered.length > states_covered.length
      best_station = station
      states_covered = covered # the status covered will be
    end
  end

  states_needed -= states_covered # loop until there is not states needed
  final_stations.add(best_station)
end
```

Explanation: On each current situation, we try to find the best stations that covers most area; as a result, it would be

* After first loop, final_stations: ['1'], states_need: {"WA", "MT", "OR", "CA", "NV", "AZ"}
* After second loop, final_stations: ['1', '3'], states_need: {"WA", "MT", "AZ"}
* After third loop, final_stations: ['1', '3', '2'], states_need: {"AZ"}
* After forth loop, final_status: ['1', '3', '2', '5'], states_need: {}

On each loop, we will pick the station that covers most areas; as a result the time complexity = N + (N-1) + ... = N * (N+1) / 2 = **O(N^2) < O(2^N)**

### NP-Complete (nondeterministic polynomial-time complete)

If a problem is NP-complete, then solve it with approximation algorithm.

#### Definitions

NP-complete problems are the subset of NP-hard problems that are also in NP.

* NP means nondeterministic polynomial-time. If we have a solution to an NP problem and can verify its correctness in polynomial time, then this problem is NP.
* NP-hard means this problem is at least as hard as the hardest problem in the class of NP.

#### Example, Salesperson travel

Salesperson wants to find a path that travel all these destinations below a given total distance. To find one, we need to consider all the combinations. The time complexity = O(N!)

![salesperson travel](assets/img/salesperson_travel)

This problem is NP-complete because

* It is NP. If we have the answer of this problem, we can check correctness in polynomial time. Loop through the answer to get total distance and check whether all cities covered, which is O(N).
  ```ruby
  distances = {
    'Marin' => { 'San Francisco' => 20, 'Palo Alto' => 45 },
    'San Francisco' => { 'Marin' => 20, 'Palo Alto' => 35, 'Berkeley' => 15 },
    'Palo Alto' => { 'Marin' => 45, 'San Francisco' => 35, 'Berkeley' => 25, 'Fremont' => 30 },
    'Berkeley' => { 'San Francisco' => 15, 'Palo Alto' => 25, 'Fremont' => 40 },
    'Fremont' => { 'Palo Alto' => 30, 'Berkeley' => 40 }
  }
  
  target_distance = 130
  target_cities = ['Marin', 'San Francisco', 'Palo alto', 'Berkeley', 'Fremont']
  answer_cities = ['Marin', 'San Francisco', 'Berkeley', 'Palo Alto', 'Fremont', 'Marin']

  # Only need to loop through once to check whether the distance 
  # is lower than target_distance and whether it covers all cities => O(n) to check
  answer_cities.each.with_index do |city, index|
    current = answer_cities[index]
    destination = answer_cities[index + 1]
    target_distance -= distances[current][destination]
    target_cities -= city
  end
  ```
* It is NP-hard. The Hamiltonian Cycle Problem is reducible to this problem.


## Reference

[grokking-algorithms-illustrated-programmers-curious](https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230)
