import { Player } from "./player";

export interface MatchEVent{
    who: Player,
    when: Number,
    what: What,
    user: string,
    match: string
}

enum What{
    Goal,
    Yellow,
    Red
}