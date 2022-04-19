(() => {
  const clubs = [
    "Hajduk",
    "Dinamo",
    "Osijek",
    "Rijeka",
    "Varteks",
    "Zagreb",
    "Gorica",
    "Lokomotiva",
  ];

  function generateRounds({ clubs, legs = 1 }) {
    // Check if it's an array
    if (!Array.isArray(clubs)) {
      console.warn("Clubs object must be an array!");
      return;
    }

    // Check that legs is an even number higher than 1
    if ((legs % 2 !== 0 && legs > 1) || legs < 1) {
      console.warn('Legs value must be "1" or the even number.');
      return;
    }

    // Show a simple info that array of clubs is empty
    if (clubs.length === 0) {
      console.info("You have passed an array without any clubs.");
    }

    let rounds = [];

    for (let i = 0; i < clubs.length - 1; i++) {
      // Set the roundName
      const roundName = `round${i + 1}`;

      // Create an empty array for the current round
      rounds.push({ [roundName]: [] });
      for (let j = 0; j < clubs.length / 2; j++) {
        const isTeamOne = Math.random() < 0.5;
        const teamOne = clubs[j];
        const teamTwo = clubs[clubs.length - 1 - j];

        const home = isTeamOne ? teamOne : teamTwo;
        const away = isTeamOne ? teamTwo : teamOne;

        // Push the values into the current round as the objects
        rounds[i][roundName].push({ home, away });
      }

      clubs.splice(1, 0, clubs[clubs.length - 1]);
      clubs.pop();
    }

    if(legs === 1) {
      return rounds;
    }

    console.log('TBC....')
  }

  const final = generateRounds({ clubs, legs: 1 });
  console.log(final);
})();
