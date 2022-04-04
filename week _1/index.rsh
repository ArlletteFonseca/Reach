//backend
'reach 0.1';

//holds definitions of functionality
const Player = {
  //define input and outputs
  //gethand takes in no parameters and outputs integer
  //seeoutcome takes in integer and has no output
  getHand: Fun([], UInt),
  seeOutcome: Fun([UInt], Null)
};
//initializing app with Reach.app
export const main = Reach.App(() => { //memorize this boiler plate
  //initialize participants
  const Alice = Participant('Alice', {
    //interact interface
    //... means alice inherits methods of Player from line 5
    ...Player
    });
    const Bob = Participant('Bob', {
      //interact interface
      //... means bob inherits methods of Player from line 5
      ...Player,
      acceptWager: Fun([Uint], )
     });
     //everything after init() takes us into consensus step or local step
     init();
      //begining of local step
     Alice.only(()=> {
       //declassify only happens in local step
       const wager = declassify(interact.wager);
       const handAlice = declassify(interact.getHand());

     });
     //publish method sends us to a consensus step
     //for syntax drop period and indent twice, see line 37
     Alice.publish(wager,handAlice)
        .pay(wager);
     commit();

     Bob.only(()=> {
       interact.acceptWager(wager);
       const handBob = declassify(interact.getHand());
     });
     Bob.publish(handBob)
        .pay(wager);
     //set up matrix

     //codyfying rock paper scissors math get alices hand and (4 subtract from bobs hand) and modulos 3

     const outcome = (handAlice + (4 - handBob)) % 3;
     //set up matrix if outcome = 2 that's Alice wins
     const [forAlice, forBob] =
     outcome == 2 ? [    2,    0]:
     outcome == 0 ? [    0,    2]:
     /*tie */       [    1,    1];
     //transfer happens in consensus and its immutable
     transfer(forAlice * wager).to(Alice);
     transfer(forBob *wager).to()
     //commit information to put you back into the step
     commit();
     // allow alice and bob to see outcome of the game
     each([Alice, Bob], () => {
       interact.seeOutcome(outcome);
     });
})

//one person can set the wager and one person accepts or denies wager
