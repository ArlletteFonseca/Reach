import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

const startingBalance = stdlib.parseCurrency(100);
const accAlice = await stdlib.newTestAccount(startingBalance);
const accBob = await stdlib.newTestAccount(startingBalance);

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
    ...Player('Alice'),
  }),
  ctcBob.p.Bob({
    //interact objec here
    ...Player('Bob'),
  }),
]));
