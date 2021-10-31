import crypto from 'crypto';

const SHA256 = (message: string) =>
  crypto.createHash('sha256').update(message).digest('hex');

export class Block {
  constructor(
    readonly timestamp = '',
    readonly data = {} as Record<string, any>,
  ) {
    this.hash = this.getHash();
    this.prevHash = '';
    this.nonce = 0;
  }

  hash: string;
  prevHash: string;
  nonce: number;

  getHash = () =>
    SHA256(
      this.prevHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce,
    );

  mine = (difficulty: number) => {
    // Loop until the substring of the hash with length of 0, <difficulty>
    // is equal to the string 0...000 with length of <difficulty>
    while (
      this.hash.substring(0, difficulty) !==
      Array(difficulty + 1).join('0')
    ) {
      // We increases our nonce so that we can get a whole different hash.
      this.nonce++;
      // Update our new hash with the new nonce value.
      this.hash = this.getHash();
    }
    console.log(`Block mined: ${this.hash}`);
  };
}

export class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now().toString())];
    this.difficulty = 1;
  }

  readonly chain: Block[];
  readonly difficulty;

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block: Block) {
    block.prevHash = this.lastBlock.hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);
    this.chain.push(block);
  }

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
