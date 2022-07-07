import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();
//taken 100 tokens and parse atomic units
const startingBalance = stdlib.parseCurrency(100);
const accAlice = await stdlib.newTestAccount(startingBalance);
const accBob = await stdlib.newTestAccount(startingBalance);

//format currency for users to a standard unit
const fmt = (x) => stdlib.formatCurrency(x, 4);
const getBalance = async (who) => fmt(await stdlib.balanceOf(who));
const beforeAlice = await getBalance(accAlice);
const beforeBob = await getBalance(accBob);

//deploy contract
//alice will be the deployer
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());
const HAND = ['Rock', 'Paper', 'Scissors'];
const OUTCOME = ['Bob Wins','Draw','Alice Wins' ]
const Player = (Who) => ({
  getHand: () => {
    const hand = Math.floor(Math.random() * 3);
    console.log(`${Who} played ${HAND[hand]}`);
    return hand;
  },
  seeOutcome:(outcome) => {
    console.log(`${Who} saw the outcome ${OUTCOME[outcome]}`)
  },
})

await Promise.all(([
  ctcAlice.p.Alice({
    //interact object here
    //Alice makes the wager and bob accepts below
    ...Player('Alice'),
    wager: stdlib.parseCurrency(5),
  }),
  ctcBob.p.Bob({
    //interact object here
    ...Player('Bob'),
    acceptWager:(amt) => {
      console.log(`Bob accepts the wager of ${fmt(amt)}.`);
    }
  }),
]));

const afterAlice = await getBalance(accAlice);
const afterBob = await getBalance(accBob);

console.log(`Alice went from ${beforeAlice} to ${afterAlice}`)
console.log(`Bob went from ${beforeBob} to ${afterBob}`)
