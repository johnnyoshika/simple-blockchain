import { Block, Blockchain } from 'Blockchain';

const blockChain = new Blockchain();
blockChain.addBlock({
  from: 'John',
  to: 'Bob',
  amount: 100,
});
console.log(blockChain.chain);
console.log(`Is Valid: ${blockChain.isValid()}`);

console.log('-----------------TAMPER DATA-----------------');

blockChain.chain[1].data = { bad: 'data' };
// This step and all following chains (if there were any) are necessary to make blockChain valid again, but it would be so expensive to make it impractical
blockChain.chain[1].hash = blockChain.chain[1].getHash();
console.log(blockChain.chain);
console.log(`Is Valid: ${blockChain.isValid()}`);
