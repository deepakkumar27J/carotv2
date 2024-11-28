export interface Rota {
    day: Date,
    duty: boolean,
    holiday: boolean
}

export const rotas: Rota[] =[{
    day: new Date("01-12-2024"),
    duty: true,
    holiday: false
},
{
    day: new Date("02-12-2024"),
    duty: true,
    holiday: false
},
{
    day: new Date("03-12-2024"),
    duty: false,
    holiday: false
},
{
    day: new Date("04-12-2024"),
    duty: false,
    holiday: false
}
]