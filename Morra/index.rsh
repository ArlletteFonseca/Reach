 //backend
'reach 0.1'

//definitions
const Player = {
 //getFingers has no parameters and outputs numbers
 getFingers: Fun([], UInt),
 //get guess of what the sum will be no parameter and outputs numbers
 getGuess: Fun([], UInt),
 //seeOutcome takes in integer and has no output
 seeOutcome: Fun(UInt, null)

}
//initialize participants
export const main = Reach.app(() => {
  const Alice = Participant("Alice", {
    //interact interface
    ...Player,
  });
  const Bob = Participant("Bob", {
    //interact interface
    ...Player,
  });
  //intitialize app
  init();
  //here both Alice and Bob are in step they then move to their local step(local machine) with the .only method

  //in local step Alice interacts with the getFingers method and the getGuess methods, she then delcassifies

  Alice.only(() => {
    const fingersAlice = declassify(interact.getFingers());
    const guessAlice = delclassify(interact.getGuess());
    //after declassifying Alice moves back to step
  });
  //Alice publishes fingers and guess at the same time, publishing moves her to consensus step
  //consensus step happens on blockchain and is immutable
  Alice.publish(fingersAlice);
  Alice.publish(guessAlice);
  //she then commits and moves back to step
  commit();
  /* QUESTION: once you publish and move to consensus is it immutable there or only after you commit??? */
  //here bob moves to local step using .only method
  Bob.only(() => {
    const fingersBob = declassify(interact.getFingers());
    const guessBob = declassify(interact.getGuess());
    //he interacts with the methods and declassifies which moves him back to step

  });
  //he then publishes his answers and moves to consensus step
  //consensus step happens on blockchain and is immutable
  Bob.publish(fingersBob);
  Bob.publish(guessBob);
  //he then commits the publishes and moves back to step
  commit();
});
