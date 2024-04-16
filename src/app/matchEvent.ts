import { Player } from "./player";

export interface MatchEVent{
    who: Player,
    when: Number,
    what: What
}

enum What{
    Goal,
    Yellow,
    Red
}