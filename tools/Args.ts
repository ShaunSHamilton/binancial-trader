class Args {
  args: string[];
  argVars: Record<string, string>;
  constructor(args: string[]) {
    this.args = args;
    this.argVars = {};
  }
  alias(short: string, long: string) {
    this.argVars[long] = "";
    return this;
  }
  get ArgVars() {
    return this.argVars;
  }
}

export default Args;
