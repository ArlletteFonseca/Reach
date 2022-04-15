//front end
//load libray
import { loadStdlib } from "@reach-sh/stdlib";
//load backend
import * as backend from "./build/index.main.mjs";
//assign variable to standard library
const stdlib = loadStdlib();
//starting balance to participants
const startingBalance = stdlib.parseCurrency(100);
//give those balances to each parseCurrency in dollars and another in pennies
const accAlice = await stdlib.newTestAccount(startingBalance);
const accBob = await stdlib.newTestAccount(startingBalance);
//tokenizing application add formatting of the currency x, 4 go to four decimal places
//fmt is format and it's a constant
//format currency while show whole numbers and up to 4 decimal places
const fmt = (x) => stdlib.formatCurrency(x, 4);
//who means Alice or bob and shows the balance of either
const getBalance = async (who) => fmt(await stdlib.balanceOf(who));
//
const beforeAlice = await getBalance(accAlice);
const beforeBob = await getBalance(accBob);

//setup contract
//alice deploys contract in the backend .contract to deploy and attach to app
const ctcAlice = accAlice.contract(backend);
//bob attaches also attaches to backend and with alices information in order to interact with the contract
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());
//frontend holds logic of application
const HAND = ["Rock", "Paper", "Scissors"];
const OUTCOME = ["Bob Wins", "Draw", "Alice wins"];
//give your methods functionality, remember that player is in the backend too
const Player = (Who) => ({
  //update our standard library to show the hand is random
  ...stdlib.hasRandom,
  //no input but outputs
  getHand: () => {
    //randomly selecting a hand 0, 1, 2 which corelates to rockc paper scissors
    const hand = Math.floor(Math.random() * 3);
    console.log(`${Who} played ${HAND[hand]}`);
    return hand;
  },
  //takes input not output
  seeOutcome: (outcome) => {
    console.log(`${Who} saw outcome ${OUTCOME[outcome]}`);
  },

  informTimeout: () => {
    //no input no output just a message
    console.log(`${Who} observed a timeout`);
  }
});

//This is our interact object
await Promise.all([
  ctcAlice.p.Alice({
    //interact object
    ...Player("Alice"),
    //create wager method, Alice wages 5 tokens
    //wager has no inputs but integer as an output
    wager: stdlib.parseCurrency(5),
    //deadline method she will launch contract and set that deadline
    deadline:UInt,
  }),
  ctcBob.p.Bob({
    //interact object
    ...Player("Bob"),
    //bob accepts wager, takes integer amt and returns a message
    acceptWager: (amt) => {
      console.log(`Bob accepst the wager of ${fmt(amt)}.`);
    },
  }),
]);
//show balance after the wager
const afterAlice = await getBalance(accAlice);
const afterBob = await getBalance(accBob);

console.log(`Alice went from ${beforeAlice} to ${afterAlice}.`);
console.log(`Bob went from ${beforeBob} to ${afterBob}.`);
