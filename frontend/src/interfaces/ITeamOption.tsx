export default interface ITeamOption {
    teams: Array<{ teamName: string }>;
    setTeams: React.Dispatch<React.SetStateAction<never[]>>;
    homeTeam: boolean;
    getTeam: (value: string, homeOrAway: string) => void;
    testId: string;
}
