'reach 0.1';
//enumaration 3 possibilities
const [ isHand, ROCK, PAPER, SCISSORS ] = makeEnum(3);
//enumaration of potential outcomes
const [ isOutcome, B_WINS, DRAW, A_WINS ] = makeEnum(3);

const winner = [handAlice, handBob] =>
  ((handAlice + 4(4-handBob)) % 3);

//define winner
const winner = (handAlice, handBob) =>
//mathematical representation for game
  ((handAlice + (4-handBob)) % 3);
//these are static assertions
  assert(winner(ROCK, PAPER) == B_WINS);
  assert(winner(PAPER, ROCK) == A_WINS);
  assert(winner(ROCK, ROCK) == DRAW);

  //for all the possibilites assertion
  forall(UInt, handAlice =>
    forall(UInt, handBob =>
        assert(isOutcome(winner(handAlice, handBob)))));

  forall(UInt, (hand) =>
  //this is an assertion about draws
    assert(winner(hand,hand)==DRAW));

    //hasRandom is pseudo randomness on the frontend, randomness should really come from backend

    const Player = {
      ...hasRandom,
      getHand: Fun([], UInt),
      seeOutcome: Fun([Uint], Null),
    }

    export const main = Reach.App(()=> {
      const Alice = Participant('('Alice')', {
        ...Player,
        wager: UInt,
       });
       const Bob = Participant('Bob', {
        ...Player,
        acceptWager: Fun([UInt], Null),

         });
         init();
          //Alice's first local step, interacts with her hand and stores it
         Alice.only(() => {
           // i am declassifing wager here
           const wager = declassify(interact.wager);
           //__ secret variable
           const _handAlice = interact.getHand();
           //turning handAlice into salt which is a one way encryption
           const [_commitAlice, _saltAlice] = makeCommitment(interact, _handAlice);
           //commitAlice below holds the salt
           const commitAlice = declassify(_commitAlice);
         });
         //alice moves to consensus step, hey I have published my hand but it's a secret
         Alice.publish(wager, commitAlice)
          .pay(wager);
          commit();
          //because we wrapped it in salt bob can't know, if it is knowable destroy contract end game
          //this is a part of the program I want the program to write an extra theorem
          unknowable(Bob, Alice(_handAlice, _saltAlice));

          Bob.only(() => {
            inteact.acceptWager(wager);
            const handBob = declassify(interact.getHand());
          });
          Bob.publish(handBob)
            .pay(wager);
          commit();

          //unsalt alices hand now that bob has played
          //alices second local step, she has declassified her salt and her hand
          Alice.only(() => {
            const saltAlice = declassify(_saltAlice);
            const handAlice = declassify(_handAlice);
          });
          //here alice publishes to blockchain
          Alice.publish(saltAlice,handAlice);
          //unencrypt in the blockchain and consensus step using checkCommitment
          checkCommitment(commitAlice, saltAlice, handAlice);
    })
