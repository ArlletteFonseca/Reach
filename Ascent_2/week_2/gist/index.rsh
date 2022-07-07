'reach 0.1'

const Player = {
  getChallenge=Fun([],UInt),
  seeResult =Fun(UInt,Null),
}

export const main = Reach.app(()=>{
  const Pat=Participant('Pat', {
    ...Player
   });
  const Vanna=Participant('Vanna', {
    ...Player
   });
   init()

  Pat.only(()=> {
    const challengePat = declassify(interact.getChallenge());
  })
  Pat.publish(challengePat);

  Vanna.only(()=> {
    const challengeVanna = declassify(interact.getChallenge());
  })
  Vanna.publish(challengeVanna);
}
);


const Player = {
  seePrice = Fun([], UInt),
  getDescription = Fun([],byte)
}


export const main = Reach.app(()=> {
  const Creator = Participant(('creator', {
    ...Player
  }));
  const Bidder = Participant(('Bidder', {
    ...Player
  }));
  const Buyer = Participant(('Buyer', {
    ...Player
  }))

  Creator.only(()=>{

  })
  Bidder.only(()=>{

  })
  Buyer.only(()=>{
    const description = declassify(interact.getDescription())
  })
  Buyer.publish(description)
});
