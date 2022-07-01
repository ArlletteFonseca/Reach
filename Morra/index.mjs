// //front end
// //load library
// import { loadStdlib } from '@reach-sh/stdlib';
// import * as backend from './build/index.main.mjs';

// //assign variable to standard library
// const stdlib = loadStdlib();


// //starting balance of each participant
// const startingBalance = stdlib.parseCurrency(100);
// //giving each participant their balances
// const accAlice = await stdlib.newTestAccount(startingBalance);
// const accBob = await stdlib.newTestAccount(startingBalance);
// //format currency and go to 4 decimal places
// const fmt = (x) => stdlib.formatCurrency(x,4);
// //function for getting the balance of a participant and displaying it with up to 4 decimals
// const getBalance = async(who) => fmt(await stdlib.balanceOf(who))
// /** get balance from each before game start here */

// //set up contract
// //Alice deploys contract
// const ctcAlice= accAlice.contract(backend);
// //bob attaches to Alice's contract to get information to interact
// const ctcBob= accBob.contract(ctcAlice.getInfo());

// //logic for game play
// const FINGERS= ['1', '2', '3','4', '5'];
// const SUM = ['1', '2', '3', '4', '5', '6', '7', '8','9', '10'];
// const OUTCOME =['Alice Wins', 'Bob Wins', 'Draw'];

// //method functionality
// const Player = (who) => ({
//   ...stdlib.hasRandom,
//   getFingers: ()=> {
//     //randomly select up to 5 fingers
//     const finger = Math.floor(Math.random() * 5);
//     console.log(`${who} played finger ${FINGERS[finger]} `);
//   },
//   getSum: () => {
//     //randomly choose sum
//     const sum = Math.floor(Math.random() * 10 );
//     console.log(`${who} played sum ${SUM[sum]}`);
//   },
//   //takes in one parameter
//   seeOutcome: (outcome) => {
//     console.log(`${who} saw outcome ${OUTCOME[outcome]}`)
//   }
//   /** add timeout method */
// })
