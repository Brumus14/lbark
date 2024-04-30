To emulate a Little Man Computer (LMC) it requires first parsing the source to a format that can then be executed using an executor that will emulate architecture of the computer including a program counter and accumulator.

The LMC is a simple computer model, it is built up of a memory unit with 100 locations to store a three digit number from 0-999. To execute a program it must be loaded into the memory, therefore each instruction is also a three digit number that can be decoded and executed by the computer. A program counter is required to point to the location of the next instruction, at the start of execution its value is 0 meaning that the first instruction should always be held at memory location 0. An accumulator is also needed to hold the value (again three digit number) that is currently being worked on and it can be modified by adding and subtracting to it.

The LMC can only execute a three digit number and it is interpreted by using the first digit as the opcode which is the type of instruction it is e.g. 1 for adding, the last two digits are the operand which is the data that is needed for the instruction e.g. for adding it would be the memory location that has the value to add to the accumulator.

It is a bit inconventient to have to write a program in just number instruction codes so a parser can be used to convert mnemonics that is much more readable into a number that represents the instruction. When using instructions that refers to another place in memory such as branching back to an instruction it can be hard to keep track of the location numbers, therefore labels are instead used that identify a memory location with a label, this means that you can instead use the label meaning that if the program changes e.g. another instruction is added in the middle which would change the location number the label will still work. Labels cannot be interpreted by the executor so they will still need to be converted back into a number of the location which will be done by the parser.

LMC has eleven total mnemonics that can be used. Ten of which are used during execution and are listed below.

| Mnemonic      | Number Code   | Description |
| :-----------: | :-----------: | :---------- |
| ADD | 1XX | Adds the value at location XX to the accumulator |
| SUB | 2XX | Subtracts the value at location XX from the accumulator |
| STA | 3XX | Stores the value currently in the accumulator to location XX |
| LDA | 5XX | Loads the value at location XX into the accumulator |
| BRA | 6XX | Sets the program counter to XX |
| BRZ | 7XX | Sets the program counter to XX if the accumulator is zero |
| BRP | 8XX | Sets the program counter to XX if the accumulator is zero or positive |
| INP | 901 | Sets the accumulator to a value inputted |
| OUT | 902 | Outputs the value in the accumulator |

Finally the `DAT` mnemonic is only used by the parser and it just loads a number into the memory location instead of the instruction number code.

To execute a program on the LMC it follows the following steps:
1. Fetch the instruction from the location of the program counters value
2. Increment the program counter
3. Decode the the instruction into its opcode and operand
4. Execute the instruction

## Parser

The first implementation of the parser will not support labels and will be introduced after all of the main parsing functionality is working.

Here is a simple example source file that could be executed by a LMC. This program inputs a number from the user, adds 5 to the number and outputs the result it.

```
INP
STA 4
ADD 5
OUT
DAT
DAT 10
```

The parser will need to use each line in the source that isn't whitespace and convert it into a number code that the executor can decode and execute.


## Executor