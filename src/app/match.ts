import { MatchEVent } from "./matchEvent";
import { Team } from "./team";

export interface Match{
    home: string,
    away: string,
    location: string,
    date: string,
    user: string
}