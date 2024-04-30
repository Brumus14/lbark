I've been looking for a project that would help introduce me to the Rust programming language,
having learning about the Little Man Computer (LMC) model in school I decided that it could be
a good introduction project as it includes lots of string manipulation that is an important part
of any programming language. Reading from files would also be required so it can then be parsed
into a series of instructions.

---

Rust provides enumeration data types that have a much more varied usage than most other languages
allowing more data to be stored within each variant, this could be useful for creating an
instruction set where a variant could be created for each instruction which would then hold extra
data if needed, for example `STA 0` would store the accumulators current value into memory
address 0 and if I want to represent this as an instruction variant it would need to also hold
the location to store to.

My implementation of a LMC interpreter will first parse the source code loaded from a file into a
list of instructions that represents the program. This program can then be executed by running
the instructions.

Firstly I created the instruction set using an enumeration:

```rust
enum Instruction {
    Add(u8),
    Subtract(u8),
    Store(u8),
    Load(u8),
    BranchAlways(usize),
    BranchZero(usize),
    BranchPositive(usize),
    Input,
    Output,
    Halt,
}
```

All instructions that require a memory address such as `ADD` have `u8` data with its respective
variant, an 8-bit unsigned integer is used to represent this memory address as the LMC model only has
100 locations available. For branching instructions they contain a `usize` which is an unsigned
integer that is the maximum size supported as the program may have many instructions to branch to.
This instruction set does not contain an instruciton related to the `DAT` mnemonic, this is because it is only used within the parser and isn't used within execution.

## Parser

The source code will need to be parsed into a program that contains instructions for how it should
be executed. Inside the source code each line is structured with three possible sections:

```
|    LABEL    |    INSTRUCTION    |    DATA    |
```

My first implementation of a parser ignored LABELS and therefore could assume that the instruction is
in the first section of the line. I could then identify which instruction it is and whether it has a
data section:

```rust
match instruction {
  "ADD" => instructions.push(Instruction::Add(data)),
  "SUB" => instructions.push(Instruction::Subtract(data)),
  "STA" => instructions.push(Instruction::Store(data)),
  "LDA" => instructions.push(Instruction::Load(data)),
  "BRA" => instructions.push(Instruction::BranchAlways(data)),
  "BRZ" => instructions.push(Instruction::BranchZero(data)),
  "BRP" => instructions.push(Instruction::BranchPositive(data)),
  "INP" => instructions.push(Instruction::Input),
  "OUT" => instructions.push(Instruction::Output),
  "HLT" => instructions.push(Instruction::Halt),
}
```

The parser has a list of instructions that the source code represents, thorugh parsing the source
it identifies the instruction mnemonic and adds the instruction variant that it represents with the
required data.

Next the parser needs to support labels which are used to identify lines in the source code so when
branching instead of referring to line numbers you can instead use a lines label. So far the parser
splits each line of source code by whitespace inbetween. Using this I can iterate over the line
segments and if a mnemonic is found then pass into the data in the next segment if needed. If the
line has a label then the segment the mnemonic if found on isn't the first that means there is a
label.

My implementation will convert labels and branches to use only numbers to reference the lines, this
way when executing the instructions it doesn't have to manage labels and can just use numbers which
makes execution much simpler.

My parser will also handle `DAT` instructions that allow naming values like a variable with a
predefined value, for example in LMC there isn't really an easy way to store a number such as 5
as you would either need to add 5 to the accumulator then store it at a memory location, however
this would have to be done at the start of the program and can get messy. Another solution could be
to have the user to input the number but again is inconvenient and annoying.

`DAT` solves this and lets you define variables at the end of the program. For example the
instruction:

```
FIVE DAT 5
```

Would essentially create a variable named 5 and set its value to 5.

## Execution

After the source code has been parsed into a list of instructions they can be interpreted to
execute it.

The executor will need to almost emulate a computer as in it will have a program counter that
indicates what instruction the executor is currently at, it is usually incremented at the end of
each instruction however when branching it is changed. An accumulator will also be needed that will
store a number that is currently being used for calculations, it is used for example in the `ADD 0`
instruction that will add the value at memory location 0 to the accumulator, for a branching
instruction such as `BRZ 5` will branch to instruction 5 if the value in the accumulator is 0.