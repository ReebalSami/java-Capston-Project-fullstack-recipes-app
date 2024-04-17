import {User} from "./User.ts";

export type Rating={
    id: string;
    ratingPoints: number;
    user: User;
}