 //backend
'reach 0.1'

//definitions
const Player = {
 //getFingers has no parameters and outputs numbers
 getFingers: Fun([], UInt),
 getSum: Fun([], UInt),
 //seeOutcome takes in integer and has no output
 seeOutcome: Fun(UInt, null)

}
//initialize participants
export const main = Reach.app(() => {
  const Alice = Participant('Alice', {
    //interact interface
    ...Player,
  });
  const Bob = Participant('Bob', {
    //interact interface
    ...Player,
    })

});
