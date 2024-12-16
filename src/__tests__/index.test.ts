import generateRoundRobin from '../index';

describe('generateRoundRobin', () => {
  const teams = ['Team1', 'Team2', 'Team3', 'Team4'];

  it('should generate correct number of rounds for single leg', () => {
    const schedule = generateRoundRobin({ clubs: teams, legs: 1 });
    expect(schedule.length).toBe(teams.length - 1);
  });

  it('should generate correct number of rounds for double legs', () => {
    const schedule = generateRoundRobin({ clubs: teams, legs: 2 });
    expect(schedule.length).toBe((teams.length - 1) * 2);
  });

  it('should ensure each team plays once per round', () => {
    const schedule = generateRoundRobin({ clubs: teams, legs: 1 });
    
    schedule.forEach(round => {
      const teamsInRound = new Set();
      round.forEach(match => {
        teamsInRound.add(match.home);
        teamsInRound.add(match.away);
      });
      expect(teamsInRound.size).toBe(teams.length);
    });
  });

  it('should throw error for odd number of teams', () => {
    const oddTeams = ['Team1', 'Team2', 'Team3'];
    expect(() => generateRoundRobin({ clubs: oddTeams }))
      .toThrow('Number of clubs must be even.');
  });

  it('should throw error for invalid legs value', () => {
    expect(() => generateRoundRobin({ clubs: teams, legs: 3 }))
      .toThrow('Legs value must be "1" or an even number.');
  });

  it('should throw error for empty clubs array', () => {
    expect(() => generateRoundRobin({ clubs: [] }))
      .toThrow('Clubs array cannot be empty.');
  });

  it('should generate reverse fixtures for second leg', () => {
    const schedule = generateRoundRobin({ clubs: teams, legs: 2 });
    const halfwayPoint = schedule.length / 2;
    
    for (let i = 0; i < halfwayPoint; i++) {
      schedule[i].forEach((match, j) => {
        const reverseMatch = schedule[i + halfwayPoint][j];
        expect(match.home).toBe(reverseMatch.away);
        expect(match.away).toBe(reverseMatch.home);
      });
    }
  });
});
