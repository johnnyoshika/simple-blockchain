import { Block, Blockchain } from 'Blockchain';

const blockChain = new Blockchain();
blockChain.addBlock(
  new Block(Date.now().toString(), {
    from: 'John',
    to: 'Bob',
    amount: 100,
  }),
);
console.log(blockChain.chain);
console.log(blockChain.isValid());
