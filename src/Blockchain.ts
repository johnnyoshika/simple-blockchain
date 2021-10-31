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
  }

  hash: string;
  prevHash: string;

  getHash = () =>
    SHA256(
      this.prevHash + this.timestamp + JSON.stringify(this.data),
    );
}

export class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now().toString())];
  }

  readonly chain: Block[];

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block: Block) {
    block.prevHash = this.lastBlock.hash;
    block.hash = block.getHash();
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
