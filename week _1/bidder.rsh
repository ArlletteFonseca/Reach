"reach 0.1";

const Player = {
  seePrice: ([], UInt),
  getDescription: ([], UInt),
};

export const main = Reach.App(() => {
  const Creator = Participant("Creator", {
    ...Player
  });
  const Bidder = Participant("Bidder", {
    ...Player
  });
  const Buyer = Participant("Buyer", {
    ...Player
  });

  init();

  Bidder.only(() => {
    const price = declassify(interact.seePrice());
  });
  Bidder.publish(price);

  Buyer.only(() =>{
    const description = declassify(interact.getDescription);
  })
  Buyer.publish(description);
});
