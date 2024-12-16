type Team = string;

interface Match {
  home: Team;
  away: Team;
}

interface ScheduleInput {
  clubs: Team[];
  legs?: number;
}

type Round = Match[];
type Schedule = Round[];

function reverseSchedule(rounds: Schedule): Schedule {
  return rounds.map((round) =>
    round.map((match) => ({
      home: match.away,
      away: match.home,
    }))
  );
}

function scheduleGenerator(legs: number, initialRounds: Schedule): Schedule {
  const additionalLegs = legs / 2;
  const reverseInitialRounds = reverseSchedule(initialRounds);
  const initial = [...initialRounds, ...reverseInitialRounds];

  return Array.from({ length: additionalLegs }, () => initial).flat();
}

function validateInput(input: ScheduleInput): void {
  const { clubs, legs = 1 } = input;

  if (!Array.isArray(clubs)) {
    throw new Error("Clubs must be an array!");
  }

  if ((legs % 2 !== 0 && legs > 1) || legs < 1) {
    throw new Error('Legs value must be "1" or an even number.');
  }

  if (clubs.length === 0) {
    throw new Error("Clubs array cannot be empty.");
  }

  if (clubs.length % 2 !== 0) {
    throw new Error("Number of clubs must be even.");
  }
}

function generateRoundRobin(input: ScheduleInput): Schedule {
  const { clubs, legs = 1 } = input;
  validateInput(input);

  const teamsArray = [...clubs]; // Create a copy to avoid mutating input
  const initialRounds: Schedule = [];

  for (let i = 0; i < teamsArray.length - 1; i++) {
    const currentRound: Round = [];

    for (let j = 0; j < teamsArray.length / 2; j++) {
      const isTeamOne = Math.random() < 0.5;
      const teamOne = teamsArray[j];
      const teamTwo = teamsArray[teamsArray.length - 1 - j];

      const home = isTeamOne ? teamOne : teamTwo;
      const away = isTeamOne ? teamTwo : teamOne;

      currentRound.push({ home, away });
    }

    initialRounds.push(currentRound);
    teamsArray.splice(1, 0, teamsArray[teamsArray.length - 1]);
    teamsArray.pop();
  }

  return legs === 1 ? initialRounds : scheduleGenerator(legs, initialRounds);
}

export = generateRoundRobin;
