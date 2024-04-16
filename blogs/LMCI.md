I've been looking for a project that would help introduce me to the Rust programming language,
having learning about the Little Man Computer (LMC) model in school I decided that it could be
a good introduction project as it includes lots of string manipulation that is an important part
of any programming language. Reading from files would also be required so it can then be parsed
into a series of instructions. Rust provides enumeration data types that have a much more
varied usage than most other languages allowing more data to be stored within each variant, I
realised

```rust
pub mod data;
mod executor;
mod parser;

use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();

    let source_code = fs::read_to_string(&args[1]).unwrap();
    let program = parser::parse_source_code(source_code);

    executor::execute_program(program);
}
```