'reach 0.1';
//backend is like instructions
const Player = {
  getHand: Fun([], UInt),
  seeOutcome: Fun([UInt], Null),
}

export const main = Reach.App(() => {
  //parcipitant interact interface
  const Alice = Participant('Alice', {
    //interact interface here
    ...Player,
    //no output
    wager:UInt,
  });
  const Bob = Participant('Bob', {
    //interact interface here
    ...Player,
    //takes unsigned integer and has no output
    //Fun is function
    acceptWager: Fun([UInt], Null),
  });
  //init is used to initialize reach app
  init();
  //after this we move into step 1 we move into a new state of our application
  //using only method she goes into her local step in her local machine
  //local step is what happens in the users machine
  //consensus step happens on blockchain and is immutable
  Alice.only(() =>{
    const wager = declassify(interact.wager);
    const handAlice = declassify(interact.getHand());
  }); //moves back to step
  Alice.publish(handAlice,wager)
    .pay(wager);
    /**##web 3.0 reduces the cost of verification, the proof that something has occurred, in web 2.0 you need a central authority##
     instead of paying middle man admin fees you pay transaction fee here**/
  //publishes and moves into consensus step
  commit();// here commits and moves back to step
  Bob.only(()=> {
    //bob accepts the wager
    interact.acceptWager(wager);
    const handBob = declassify(interact.getHand());
  });
  Bob.publish(handBob)
    .pay(wager);
  const outcome = (handAlice + (4 - handBob)) % 3;
  const          [forAlice, forBob] =
  outcome == 2 ? [       2,      0] :
  outcome == 0 ? [       0,      2] :
  /*tie */       [       1,      1] ;
//moves tokens from the smart contract to a participant
transfer(forAlice * wager).to(Alice);
transfer(forBob   * wager).to(Bob);
  commit();

  //each we move from consensus to local step
  each([Alice, Bob], ()=>{
    interact.seeOutcome(outcome);
  })

})
