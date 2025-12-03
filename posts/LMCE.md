---
title: Little Man Computer Executor
date: 02/12/2025
tags:
  - Zig
  - Programming
---
# Introduction

I've been learning the Zig programming language recently and I decided to start my first project, a Little Man Computer (LMC) Executor.

# Specification

LMC is a very simple model for a computer which is commonly used to introduce people into more complex ideas like assembly programming and computer architecture.

LMC defines a computer which has 100 memory locations storing 3-digit unsigned integers and it has a very simple instruction set with only 10 instructions available although with these limitations it still has many programming possibilities. There are only really 3 registers needed: accumulator which stores the current working value, program counter which points to the memory location of the current instruction, finally the instruction register which stores the current instruction being executed. Along with these registers, there is also a negative flag which indicates whether the value in the accumulator has become negative.


| Mnemonic      | Number Code   | Description                                                           |
|---------------|---------------|-----------------------------------------------------------------------|
| ADD           | 1XX           | Adds the value at location XX to the accumulator                      |
| SUB           | 2XX           | Subtracts the value at location XX from the accumulator               |
| STA           | 3XX           | Stores the value currently in the accumulator to location XX          |
| LDA           | 5XX           | Loads the value at location XX into the accumulator                   |
| BRA           | 6XX           | Sets the program counter to XX                                        |
| BRZ           | 7XX           | Sets the program counter to XX if the accumulator is zero             |
| BRP           | 8XX           | Sets the program counter to XX if the accumulator is zero or positive |
| INP           | 901           | Sets the accumulator to a value inputted                              |
| OUT           | 902           | Outputs the value in the accumulator                                  |
| HLT           | 000           | Stops execution                                                       |

When creating a program for LMC there is another mnemonic that can be used which is similar to defining variables in other programming languages: `DAT`. This allows you to initialise a memory location to a value and then you can reference that value using its memory location.

You might have realised that referencing memory locations by their location numbers can get quite tedious and this is where labels come in, these are also used in some programming languages including Zig which is what I used in this project and assembly programming. Labels allow you to name memory locations so that you can use their names instead of having to use a number, this also makes programming slightly more dynamic as if you refactor the program memory locations will change around however the name will still reference the same data in memory.

Labels are commonly used to create loops, referencing "variables" created using `DAT` and for branching around the program.

# Syntax
LMC uses a very similar syntax to assembly languages which makes it very easy to translate each line to their numerical versions with very minimal pre-processing. Each line can be broken up into a maximum of 3 segments.

| Label | Instruction | Data |
|-------|-------------|------|

An example program that adds two numbers together:

```lmc
// HELLO comment
       INP
       STA first
       INP
       STA second
       LDA first
       ADD second
       OUT

first  DAT
second DAT
```

My implementation also allows comments which are prefixed by `//`.

# Implementation
The implementation of my LMC executor consists of 3 parts: parser, generator, and executor.

## Parser
Splits each line into segment strings and ignores any comments and whitespace.

## Generator
Using the segments from the parser it first finds any labels and stores them into a map along with its line number which also is its memory location. After this all labels are removed from the segments, however, referencing labels are kept in as they will be replaced later.

An instruction map is created that maps instruction mnemonics to their numerical values, this map however doesn't include operand values and is instead added on later.

It iterates through each line and using the instruction map translates the instruction mnemonic into its numerical value and puts it into the relavant memory location, then if an operand is required it reads that segment and adds the value to the memory location which results in the correct instruction translation. However, if the operand segment isn't a number and is instead a label we use the label map that was generated to convert the label into its number value.

The result is the fully translated program into number values which can be loaded into memory for execution.

## Executor
Using the specification as stated earlier 3 registers are required: accumulator, program counter and instruction register. There are 100 memory locations that can store 3-digit numbers.

First using the program given it is loaded into memory by simply copying the values.

Then execution begins and goes through the cycle:\
**Fetch** - Retrieves the instruction from the memory location pointed to by the program counter into the instruction register.\
**Decode** - Split the retrieved instruction into the opcode which is the first digit and the operand which is the last two digits.\
**Execute** - Carry out the specified logic based on the opcode and operand. Then increment the program counter if a branching operation wasn't executed.

# Code
My Zig code can be found at <https://github.com/Brumus14/LMCE>.
