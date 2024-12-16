type Team = string;

type RoundRobinError = 
  | { type: 'INVALID_ARRAY'; message: string }
  | { type: 'INVALID_LEGS'; message: string }
  | { type: 'EMPTY_ARRAY'; message: string }
  | { type: 'ODD_TEAMS'; message: string }
  | { type: 'INVALID_TEAM_NAME'; message: string; team: string };

interface Match {
  home: Team;
  away: Team;
  roundNumber?: number;
}

interface ScheduleInput {
  clubs: Team[];
  legs?: number;
  randomizeHome?: boolean;
}

type Round = Match[];
type Schedule = Round[];

const createMatch = (
  home: Team, 
  away: Team, 
  randomizeHome: boolean = true,
  roundNumber?: number
): Match => {
  const match = randomizeHome && Math.random() < 0.5 
    ? { home: away, away: home }
    : { home, away };
    
  return roundNumber ? { ...match, roundNumber } : match;
};

const rotateTeams = (teams: Team[]): Team[] => {
  const newTeams = [...teams];
  const lastTeam = newTeams.pop();
  if (lastTeam) {
    newTeams.splice(1, 0, lastTeam);
  }
  return newTeams;
};

const reverseSchedule = (rounds: Schedule): Schedule =>
  rounds.map(round =>
    round.map(match => ({
      home: match.away,
      away: match.home,
      roundNumber: match.roundNumber
    }))
  );

const scheduleGenerator = (legs: number, initialRounds: Schedule): Schedule => {
  const additionalLegs = legs / 2;
  const reverseInitialRounds = reverseSchedule(initialRounds);
  const initial = [...initialRounds, ...reverseInitialRounds];

  return Array.from({ length: additionalLegs }, () => initial).flat();
};

const validateTeamNames = (teams: Team[]): void => {
  const seen = new Set<Team>();
  teams.forEach(team => {
    if (typeof team !== 'string' || team.trim() === '') {
      throw new Error(`Invalid team name: ${team}`);
    }
    if (seen.has(team)) {
      throw new Error(`Duplicate team name: ${team}`);
    }
    seen.add(team);
  });
};

const validateInput = (input: ScheduleInput): void => {
  const { clubs, legs = 1 } = input;

  if (!Array.isArray(clubs)) {
    throw new Error("Clubs must be an array!");
  }

  validateTeamNames(clubs);

  if ((legs % 2 !== 0 && legs > 1) || legs < 1) {
    throw new Error('Legs value must be "1" or an even number.');
  }

  if (clubs.length === 0) {
    throw new Error("Clubs array cannot be empty.");
  }

  if (clubs.length % 2 !== 0) {
    throw new Error("Number of clubs must be even.");
  }
};

const generateRoundRobin = (input: ScheduleInput): Schedule => {
  const { clubs, legs = 1, randomizeHome = true } = input;
  validateInput(input);

  let teamsArray = [...clubs];
  const initialRounds: Schedule = [];

  for (let i = 0; i < teamsArray.length - 1; i++) {
    const currentRound: Round = [];

    for (let j = 0; j < teamsArray.length / 2; j++) {
      const teamOne = teamsArray[j];
      const teamTwo = teamsArray[teamsArray.length - 1 - j];

      currentRound.push(
        createMatch(teamOne, teamTwo, randomizeHome, i + 1)
      );
    }

    initialRounds.push(currentRound);
    teamsArray = rotateTeams(teamsArray);
  }

  return legs === 1 ? initialRounds : scheduleGenerator(legs, initialRounds);
};

export = generateRoundRobin;
