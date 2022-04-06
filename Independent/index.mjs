import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const role = 'seller';
console.log('Your role is ${role}.');
//assign variable to standard library
const stdlib = loadStdlib(process.env);
console.log(`The consensus network is ${stdlib.connector}.`);
const suStr = stdlib.standardUnit;
const auStr = stdlib.atomicUnit;
const toAU = (su) => stdlib.parseCurrency(su);
const toSU = (au) => stdlib.formatCurrency(au, 4);
const suBal = 1000;
console.log(`Balance is ${suBal} ${suStr}`);
const auBal = toAU(suBal);
//standard units
console.log(`Balance is  ${auBal} ${auStr}`);
console.log(`Balance is ${toSU(auBal)} ${suStr}`);


//async call
(async () => {

  //interaction object
  const commonInteract = {};
  //if the role is seller,
  //seller
  if(role === 'seller') {
    const sellerInteract = {...commonInteract };
    //parse into atomic units of 1000
    const acc = await stdlib.newTestAccount(stdlib.parseCurrency(1000));
    // seller deploys contract in the backend
    const ctc = acc.contract(backend);
    await backend.Seller(ctc, sellerInteract);
  }

  //Buyer
  else {
    const buyerInteract = {...commonInteract };
  }
})
