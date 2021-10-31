import crypto from 'crypto';

const SHA256 = (message: string) =>
  crypto.createHash('sha256').update(message).digest('hex');

export class Block {
  constructor(
    readonly timestamp: number,
    readonly prevHash = '',
    readonly nonce = 0,
    public data = {} as Record<string, any>,
  ) {
    this.hash = this.getHash();
  }

  hash: string;

  getHash = () =>
    SHA256(
      this.prevHash +
        this.timestamp.toString() +
        JSON.stringify(this.data) +
        this.nonce,
    );

  mine = (difficulty: number): Block => {
    // Loop until the substring of the hash with length of 0, <difficulty>
    // is equal to the string 0...000 with length of <difficulty>
    if (
      this.hash.substring(0, difficulty) ===
      Array(difficulty + 1).join('0')
    )
      return this;

    return new Block(
      this.timestamp,
      this.prevHash,
      this.nonce + 1,
      this.data,
    ).mine(difficulty);
  };
}

export class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now())];
    this.difficulty = 1;
  }

  readonly chain: Block[];
  readonly difficulty;

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock = (data: Record<string, any>) => {
    this.chain.push(
      new Block(Date.now(), this.lastBlock.hash, 0, data).mine(
        this.difficulty,
      ),
    );
  };

  isValid = () => {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.getHash()) return false;

      if (currentBlock.prevHash !== prevBlock.hash) return false;
    }

    return true;
  };
}
