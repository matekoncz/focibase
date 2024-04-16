import { MatchEVent } from "./matchEvent";
import { Team } from "./team";

export interface Match{
    home: Team,
    away: Team,
    events: MatchEVent[],
    date: Number
}