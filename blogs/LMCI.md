I've been looking for a project that would help introduce me to the Rust programming language,
having learning about the Little Man Computer (LMC) model in school I decided that it could be
a good introduction project as it includes lots of string manipulation that is an important part
of any programming language. Reading from files would also be required so it can then be parsed
into a series of instructions.

Rust provides enumeration data types that have a much more
varied usage than most other languages allowing more data to be stored within each variant, I
realised this could be useful for creating an instruction set where a variant could be created
for each instruction which would then hold extra data if needed, for example `STA 0` would store
the accumulators current value into memory address 0 and if I want to represent this as an
instruction variant it would need to also store the location to store to which Rust allows.
