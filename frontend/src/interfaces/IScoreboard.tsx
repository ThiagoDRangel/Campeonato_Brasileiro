export default interface IScoreboard {
    homeTeam: boolean;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    qtyGoal?: number;
    testId?: string;
}
