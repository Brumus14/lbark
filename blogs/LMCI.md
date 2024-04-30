To emulate a Little Man Computer (LMC) it requires first parsing the source to a format that can then be executed using an executor that will emulate architecture of the computer including a program counter and accumulator.

The LMC is a simple computer model, it is built up of a memory unit with 100 locations to store a three digit number from 0-999. To execute a program it must be loaded into the memory, therefore each instruction is also a three digit number that can be decoded and executed by the computer. A program counter is required to point to the location of the next instruction, at the start of execution its value is 0 meaning that the first instruction should always be held at memory location 0. An accumulator is also needed to hold the value (again three digit number) that is currently being worked on and it can be modified by adding and subtracting to it.

It is a bit inconventient to have to write a program in just number instruction codes so a parser can be used to convert mnemonics that is much more readable into a number that represents the instruction. When using instructions that refers to another place in memory such as branching back to an instruction it can be hard to keep track of the location numbers, therefore labels are instead used that identify a memory location with a label, this means that you can instead use the label meaning that if the program changes e.g. another instruction is added in the middle which would change the location number the label will still work. Labels cannot be interpreted by the executor so they will still need to be converted back into a number of the location which will be done by the parser.

## Parser

Here is a simple example source file that could be executed by a LMC. This program inputs a number from the user, adds 5 to the number and outputs the result it.

```
INP
STA 4
ADD 5
OUT
DAT
DAT 10
```

The parser will need to use each line in the source that isn't whitespsace and convert it into a number that represents the instruction.

## Emulator