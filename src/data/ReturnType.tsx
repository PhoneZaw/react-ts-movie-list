import { MovieType } from "./MovieType"

export type ReturnType = {
    page : number,
    results : Array<MovieType>,
    total_pages : number
}