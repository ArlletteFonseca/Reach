'reach 0.1';

//holds definition of functionality
const commonInteract = {};
//object literal passing all key:value pairs from an object
const sellerInteract = { ...commonInteract };
const buyerInteract = { ...commonInteract };

//initializing app with Reach app
export const main = Reach.App(() =>{
  //initialize participants
  const S = Participant('Seller', sellerInteract  );
  const B = Participant('Buyer', buyerInteract);
  init();
  //beginning of local step
  exit();

});
