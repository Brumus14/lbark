---
title: Implementing A Basic Hash Map
date: 19/01/2026
tags:
  - Data Structures
  - C
---
On the surface hash maps seem relatively simple however like many things once you get to implementation you start to realise just how little you really understand. Well at least this happened to me recently while working on my voxel-based game in C, previously I was storing chunks in a linked-list which is simple to implement but iteration is very slow, so I decided to instead use a hash map which has an average time complexity of Θ(1) for searching, insertion and deletion.

Hash maps map keys to values,

Hash maps of course use hash functions which takes data of any size as input and then uses a series of calculations to produce an output of fixed size. Good hash functions are uniform meaning the hashes are distributed evenly across the output space, this means the hash for "1" will be completely different to "2". Collisions are also an issue in hashing, since the inputs have infinite possibilities and the output only has finite then there will always be collisions which are when different inputs have the same output values.



- - -
