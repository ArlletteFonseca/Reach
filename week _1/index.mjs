//front end
//load libray
import{ loadStdlib } from '@reach-sh/stdlib';
//load backend
import * as backend from './build/index.main.mjs';
//assign variable to standard library
const stdlib = loadStdlib();
//starting balance to participants
const startingBalance = stdlib.parseCurrency(100);
//give those balances to each parseCurrency in dollars and another in pennies
const accAlice = await stdlib.newTestAccount(startingBalance)
const accBob = await stdlib.newTestAccount(startingBalance)
//tokenizing application
const fmt =(x) => stdlib.formatCurrency(x, 4);
const getBalance = async (who) => fmt(await stdlib.balanceOff(who));
const beforeAlice = await getBalance(accAlice);
const beforeBob = await getBalance(accBob);

//setup contract
//alice deploys contract in the backend .contract to deploy and attach to app
const ctcAlice = accAlice.contract(backend);
//bob attaches also attaches to backend and with alices information in order to interact with the contract
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());
//frontend holds logic of application
const HAND = ['Rock', 'Paper', 'Scissors'];
const OUTCOME = ['Bob Wins', 'Draw', 'Alice wins'];
//give your methods functionality, remember that player is in the backend too
const Player = (Who) => ({
  //no input but outputs
  getHand: ()=> {
    //randomly selecting a hand 0, 1, 2 which corelates to rockc paper scissors
    const hand = Math.floor(Math.random() * 3);
    console.log(`${Who} played ${HAND[hand]}`);
    return hand;
  },
  //takes input not output
  seeOutcome: (outcome) => {
    console.log(`{Who} saw outcome ${OUTCOME[outcome]}`)
  }
});

await Promise.all([
  ctcAlice.p.Alice({
    //interact object
    ...Player('Alice'),
    //create wager method, she wages 5 tokens
    wager: stdlib.parseCurrency(5),
  }),
  ctcBob.p.Bob({
    //interact object
    ...Player('Bob'),
    //bob accepts wager
    acceptWager:(amt)=> {
      console.log('Bob accepst the wager of ${fmt(amt)}.')
    }
  }),
]);

const afterAlice = await getBalance(accAlice);
const afterBob = await getBalance(accBob);

console.log('Alice went from ${beforeAlice} to ${afterAlice}.');
console.log('Bob went from ${beforeBob} to ${afterBob}.');
