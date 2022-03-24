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
    ...Player('Alice')
  }),
  ctcBob.p.Bob({
    //interact object
    ...Player('Bob')
  }),
])
