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
    ...Player
  });
  const Bob = Participant('Bob', {
    //interact interface here
    ...Player
  });
  init();
  //after this we move into step 1 we move into a new state of our application
  //using only method she goes into her local step in her local machine
  //local step is what happens in the users machine
  //consensus step happens on blockchain and is immutable
  Alice.only(() =>{
    const handAlice = declassify(interact.getHand());
  }); //moves back to step
  Alice.publish(handAlice);//publishes and moves into consensus step
  commit();// here commits and moves back to step
  Bob.only(()=> {
    const handBob = declassify(interact.getHand());
  });
  Bob.publish(handBob);
  const outcome = (handAlice + (4 - handBob)) % 3;
  commit();

  //each we move from consensus to local step
  each([Alice, Bob], ()=>{
    interact.seeOutcome(outcome);
  })

})
