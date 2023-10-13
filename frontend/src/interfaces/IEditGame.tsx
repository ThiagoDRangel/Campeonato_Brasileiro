export default interface IEditGame {
    homeTeam: Array<{ teamName: string }>;
    awayTeam: Array<{ teamName: string }>;
    homeTeamGoals: number;
    awayTeamGoals: number;
    idMatch: number;
    updateMatch: (id: number, body: object) => void;
    finishMatch: (id: number) => void;
    getTeam: (team: string, homeOrAway: string) => void;
}
